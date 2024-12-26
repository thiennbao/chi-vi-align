from flask import request, jsonify
from app.api import api_blueprint
from app.utils.pdf_extractor import PDFExtractor


@api_blueprint.route('/ocr', methods=['POST'])
def ocr():
  # Validate request file
  if 'file' not in request.files:
    return jsonify({'message': 'No file provided'}), 400
  file = request.files['file']
  if not file.filename.endswith('.pdf'):
    return jsonify({'message': 'Invalid file type, only PDF is allowed'}), 400
  # Validate request text direction
  direction = request.form.get('direction')
  if direction == 'horizontal':
    direction = 'hp'
  elif direction == 'vertical':
    direction = 'sp'
  else:
    return jsonify({'message': 'Text direction must be horizontal or vertical'}), 400
  # Validate request image size
  try:
    size = int(request.form.get('size'))
    if size < 0: return jsonify({'message': 'Image size must be >= 0'}), 400
  except:
    return jsonify({'message': 'Image size must be a number'}), 400
  # Validate request page range
  try:
    from_page = int(request.form.get('from'))
    to_page = int(request.form.get('to'))
    if from_page < 1: return jsonify({'message': 'Page range must be >= 1'}), 400
    if to_page < 1: return jsonify({'message': 'Page range must be >= 1'}), 400
  except:
    return jsonify({'message': 'Page range must be a number'}), 400
  
  # Ocr file
  pdf_extractor = PDFExtractor(direction, size, from_page, to_page)
  pdf_extractor.extract_pdf(file)

  return jsonify(pdf_extractor.result), 200