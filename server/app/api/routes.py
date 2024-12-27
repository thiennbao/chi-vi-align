from flask import request, jsonify
import uuid
import os
import json

from app.api import api_blueprint
from app.utils.pdf_extractor import PDFExtractor
from app.utils.sentencizer import Sentencizer


@api_blueprint.route('/ocr', methods=['POST'])
def ocr():
  try:
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
      size = int(request.form.get('size') or 0)
    except:  
      return jsonify({'message': 'Image size must be a number'}), 400
    # Validate request page range
    try:
      from_page = int(request.form.get('from') or 1)
      if from_page < 1: return jsonify({'message': 'Page range must be >= 1'}), 400
      to_page = request.form.get('to')
      to_page = int(to_page) if to_page else None
      if to_page and to_page < 1: return jsonify({'message': 'Page range must be >= 1'}), 400
    except:
      return jsonify({'message': 'Page range must be a number'}), 400
    
    # Ocr file
    print(f'[*] Processing ocr: {file}, {direction}, {size}, {from_page}, {to_page}')
    pdf_extractor = PDFExtractor(direction, size, from_page, to_page)
    pdf_extractor.extract_pdf(file)
    
    # Save data
    id = request.form.get('id') or uuid.uuid4()
    workdir = f'data/{id}'
    os.makedirs(workdir, exist_ok=True)
    with open(f'{workdir}/ocr.json', 'w') as json_file:
      json.dump(pdf_extractor.result, json_file)

    return jsonify({'message': 'Ocr file successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500
  
  
@api_blueprint.route('/sen', methods=['POST'])
def sentencize():
  try:
    # Validate request
    if 'text' not in request.files:
      return jsonify({'message': 'No text provided'}), 400
    text = request.files['text']
    if not text.filename.endswith('.txt'):
      return jsonify({'message': 'Invalid file type, only TXT is allowed'}), 400
    # Validate request splitter
    split = request.form.get('split')
    split = rf'[{split}]' if split else r'[^\w]'
    
    # Sentencize file
    print(f'[*] Processing ocr: {text}, {split}')
    sentencizer = Sentencizer(split)
    sentencizer.sentencize(text)
    
    # Save data
    id = request.form.get('id') or uuid.uuid4()
    workdir = f'data/{id}'
    os.makedirs(workdir, exist_ok=True)
    with open(f'{workdir}/chi.json', 'w') as json_file:
      json.dump(sentencizer.result, json_file)
    
    return jsonify({'message': 'Sentencize successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500

    

@api_blueprint.route('/chi', methods=['POST'])
def chi_align():
  return "Chi align"

@api_blueprint.route('/vi', methods=['POST'])
def vi_align():
  return "Vi align"