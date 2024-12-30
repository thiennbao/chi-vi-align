import fitz
import os
import base64
import requests
import uuid


class PDFExtractor:
  def __init__(self, direction: str = 'auto', size: int = 0, from_page: int = 1, to_page: int = None):
    self.from_page = from_page
    self.to_page = to_page
    self.config = {
      'token': os.getenv('OCR_API_TOKEN'),
      'email': os.getenv('OCR_API_EMAIL'),
      'image_size': size,
      'det_mode': direction,
      'char_ocr': False,
      'return_position': True,
      'return_choices': True
    }
    self.result = []
    

  # Call Kandianguji API to OCR image
  def _ocr_image(self, image: dict, page: int, retry: int = 0):
    image_bytes = image['image']
    width, height = image['width'], image['height']
    encoded = base64.b64encode(image_bytes).decode('utf-8')
    try:
      payload = { **self.config, 'image': encoded }
      res = requests.post('https://ocr.kandianguji.com/ocr_api', json=payload)
      data = [{
        'pageId': page,
        'position': line['position'],
        'relative_pos': {'left': f'{line['position'][0][0] / width * 100}%', 'top': f'{line['position'][1][1] / height * 100}%'},
        'relative_width': f'{max(abs(line['position'][1][0] - line['position'][0][0]), abs(line['position'][2][0] - line['position'][0][0])) / width * 100}%',
        'relative_height': f'{max(abs(line['position'][1][1] - line['position'][0][1]), abs(line['position'][2][1] - line['position'][0][1])) / height * 100}%',
        'similar': [word['choices'] for word in line['words']],
        'ocr': line['text'],
      } for line in res.json()['data']['text_lines']]
      return data
    except Exception as e:
      print(f"An error occurred: {e}")
      return self._ocr_image(image_bytes, retry - 1) if retry > 0 else []
    

  # Extract PDF file
  def extract_pdf(self, file):
    # Create temp file
    os.makedirs('temp', exist_ok=True)
    file_path = f'temp/{uuid.uuid4()}.pdf'
    file.save(file_path)
    
    # Process file
    pdf_file = fitz.open(file_path)
    page_range = range(self.from_page - 1, self.to_page if self.to_page else len(pdf_file))
    for page_index in page_range:
      page = pdf_file.load_page(page_index)
      image_list = page.get_images(full=True)
      if image_list:
        base_image = pdf_file.extract_image(image_list[0][0])
        data = self._ocr_image(base_image, page_index, retry=3)
        self.result += data
      
    # Clear temp
    pdf_file.close()
    os.remove(file_path)
