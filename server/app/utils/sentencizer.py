import os
import json
import re
import uuid


class Sentencizer():
  def __init__(self, split):
    self.split = split
    self.result = []
    
    
  def sentencize(self, file):
    # Create temp file
    os.makedirs('temp', exist_ok=True)
    file_path = f'temp/{uuid.uuid4()}.txt'
    file.save(file_path)
    
    # Process file
    with open(file_path, 'r', encoding='utf-8') as file:
      for line in file:
        self.result += [s.strip() for s in re.split(self.split, line.strip()) if s.strip()]

    # Clear temp
    os.remove(file_path)
    