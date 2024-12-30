import google.generativeai as genai
import os
import json
import copy
import time

class APIAligner():
  def __init__(self, candidates: int = 200):
    self.candidates = candidates
    self.result = []
    
    genai.configure(api_key=os.getenv('GEMINI_APIKEY'))
    self.model = genai.GenerativeModel(
      model_name="gemini-2.0-flash-exp",
      generation_config={
      "temperature": 0,
      "top_p": 0.95,
      "top_k": 40,
      "max_output_tokens": 1024,
      "response_mime_type": "text/plain",
      }
    )
    


  def align(self, src_file_path: str, des_file_path: str):
    # Read data
    with open(src_file_path, 'r', encoding='utf-8') as src_file:
      src = json.load(src_file)
    with open(des_file_path, 'r', encoding='utf-8') as des_file:
      des = json.load(des_file)
      self.result = copy.deepcopy(des)

    # Match and translate
    for i, des_box in enumerate(des):
      print(i, end=' ', flush=True)
      des_text = des_box['ocr']
      pos = i / len(des)
      
      candidates_range = range(max(int(pos * len(src) - self.candidates / 2), 0), min(int(pos * len(src) + self.candidates / 2), len(src)))
      src_candidates = [f'{i} {src[i]}' for i in candidates_range]
      
      matched = self._match_and_trans(des_text, src_candidates, retry=5)
      try:
        indices, trans = matched
        self.result[i]['vi_aligned'] = '. '.join([src[i] for i in indices])
        self.result[i]['vi_trans'] = trans
      except Exception:
        self.result[i]['vi_aligned'] = ''
        self.result[i]['vi_trans'] = ''
        
  def _match_and_trans(self, text: str, candidate_texts: list[str], retry: int = 0):
    try:
      time.sleep(1)
      response = self.model.generate_content(
        f"""Tôi sẽ cho bạn 1 dòng chữ tiếng Trung được scan từ quyển Hồng Lâu Mộng, kèm với đó là bản dịch tiếng Việt của Hồng Lâu Mộng, được chia ra thành từng câu. Ở đầu mỗi dòng đó là 1 số ID dòng. Bạn có 3 nhiệm vụ như sau:
        - Tìm những câu tiếng Việt trong bản dịch được cung cấp có nội dung tương ứng với dòng tiếng Trung được gửi. Lưu ý là 1 dòng tiếng Trung có thể bao hàm nhiều câu ở tiếng Việt. Hãy lưu những ID của các câu tiếng Việt phù hợp là các phần tử trong 1 mảng. Mảng này chỉ chứa các ID. Một dòng tiếng Trung chỉ ứng với tối đa 3 câu tiếng Việt, tuyệt đối không nhiều hơn
        - Viết một phiên bản dịch tiếng Việt của riêng bạn với văn phong gần giống với bản dịch tiêng Việt được cung cấp, lối viết trang trọng hoa mỹ theo kiểu phong kiến nhưng không dài hơn quá nhiều so với bản gốc
        - Kết quả được đưa ra dưới dạng JSON, với 2 đáp án của 2 câu trên là 2 phần tử trong 1 array chứ không phải dictionary. Tuyệt đối Không trả về phần chữ nào ngoài phần JSON này. Ví dụ: [[1,2],"text ví dụ"]. Lưu ý rằng nếu không có đáp án phù hợp, tuyệt đối trả về string rỗng và array con rỗng, tuyệt đối không thay thế bằng một trong các dòng.
        Dưới đây là 1 dòng duy nhất tiếng Trung được scan từ Hồng Lâu Mộng
        {text}
        Dưới đây là các câu trong bản dịch tiếng Việt của Hồng Lâu Mộng, mỗi câu trên 1 dòng
        {'\n'.join(candidate_texts)}"""
      )
      return json.loads(response.text[7:-4])
    except json.decoder.JSONDecodeError as e:
      print(f"An error occurred: {e}")
      return None
    except Exception as e:
      print(f"An error occurred: {e}")
      time.sleep(5)
      if retry > 0:
        return self._match_and_trans(text, candidate_texts, retry - 1)
      else:
        return ''