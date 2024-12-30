import json
import copy
from Levenshtein import ratio, jaro
from collections import Counter
import re

class MEDAligner:
  def __init__(self, threshold: float = 0.5, candidates: int = 200):
    self.threshold = threshold
    self.candidates = candidates
    self.result = []
    
    
  def align(self, src_file_path: str, des_file_path: str):
    # Read data
    with open(src_file_path, 'r', encoding='utf-8') as src_file:
      src = json.load(src_file)
    with open(des_file_path, 'r', encoding='utf-8') as des_file:
      des = json.load(des_file)
      self.result = copy.deepcopy(des)

    # Align
    for i, des_box in enumerate(des):
      des_text = des_box['ocr']
      pos = i / len(des)
      
      candidates_range = range(max(int(pos * len(src) - self.candidates / 2), 0), min(int(pos * len(src) + self.candidates / 2), len(src)))
      src_candidates = [src[i] for i in candidates_range]
      aligned = ''
      
      for src_text in src_candidates:
        src_text = re.sub(r'[A-Za-z0-9]|[^\w]', '', src_text)
        sim_ratio = ratio(src_text, des_text)
        sim_jaro = jaro(src_text, des_text)
        if sim_ratio > self.threshold or sim_jaro > self.threshold:
          aligned += src_text
          matches = Counter(des_text) & Counter(src_text)
          for char, count in matches.items():
            des_text = des_text.replace(char, '', count)
      self.result[i]['chi_aligned'] = aligned
    self._align_chi_char()
  
  def _align_chi_char(self):
    for box in self.result:
      src, des, similar = box['ocr'], box['chi_aligned'], box['similar']
      if not des:
        box['ocr_char_align'] = ''
        box['chi_char_align'] = ''
        continue
      len_src = len(src) + 1
      len_des = len(des) + 1
      # Init distance table
      D = [[0] * len_des for _ in range(len_src)]
      for i in range(len_src): D[i][0] = i
      for j in range(len_des): D[0][j] = j
      for i in range(1, len_src):
        for j in range(1, len_des):
          not_matched = src[i-1] != des[j-1] and des[j-1] not in similar[i-1]
          D[i][j] = min(D[i-1][j] + 1, D[i][j-1] + 1, D[i-1][j-1] + 2 * not_matched)
      # Align char to char
      i, j = len_src - 1, len_des - 1
      align_src, align_des = [], []
      while i > 0 or j > 0:
        if i > 0 and j > 0 and src[i - 1] == des[j - 1]:
          align_src.append(src[i - 1])
          align_des.append(des[j - 1])
          i -= 1
          j -= 1
        elif i > 0 and (D[i][j] == D[i - 1][j] + 1):
          align_src.append(src[i - 1])
          align_des.append('_')
          i -= 1
        elif j > 0 and (D[i][j] == D[i][j - 1] + 1):
          align_src.append('_')
          align_des.append(des[j - 1])
          j -= 1
        else:
          align_src.append(src[i - 1])
          align_des.append(des[j - 1])
          i -= 1
          j -= 1
      align_src.reverse()
      align_des.reverse()
      box['ocr_char_align'] = ''.join(align_src)
      box['chi_char_align'] = ''.join(align_des)
