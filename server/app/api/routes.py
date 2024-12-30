from flask import request, jsonify, send_file
import uuid
import os
import json

from app.api import api_blueprint
from app.utils.pdf_extractor import PDFExtractor
from app.utils.sentencizer import Sentencizer
from app.utils.med_aligner import MEDAligner
from app.utils.api_aligner import APIAligner



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
    
    id = request.form.get('id') or uuid.uuid4()
    workdir = f'data/{id}'
    
    # Ocr file
    print(f'[*] Processing OCR, ID: {id}')
    pdf_extractor = PDFExtractor(direction, size, from_page, to_page)
    pdf_extractor.extract_pdf(file)
    
    # Save data
    os.makedirs(workdir, exist_ok=True)
    file.seek(0)
    file.save(f'{workdir}/.pdf')
    with open(f'{workdir}/ocr.json', 'w') as json_file:
      json.dump(pdf_extractor.result, json_file)

    return jsonify({'message': 'OCR file successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500
  
  
  
@api_blueprint.route('/sen', methods=['POST'])
def sentencize():
  try:
    # Validate request
    if 'chiText' not in request.files:
      return jsonify({'message': 'No Chinese text provided'}), 400
    chi_text = request.files['chiText']
    if 'viText' not in request.files:
      return jsonify({'message': 'No Vietnamese text provided'}), 400
    vi_text = request.files['viText']
    if not chi_text.filename.endswith('.txt') or not vi_text.filename.endswith('.txt'):
      return jsonify({'message': 'Invalid file type, only TXT is allowed'}), 400
    # Validate request splitter
    chi_split = request.form.get('chiSplit')
    chi_split = rf'[{chi_split}]' if chi_split else r'[^\w\s]'
    vi_split = request.form.get('viSplit')
    vi_split = rf'[{vi_split}]' if vi_split else r'[^\w\s]'
    
    id = request.form.get('id') or uuid.uuid4()
    workdir = f'data/{id}'
    os.makedirs(workdir, exist_ok=True)
    
    # Sentencize texts
    print(f'[*] Processing Sentencizing, ID: {id}')
    chi_sentencizer = Sentencizer(chi_split)
    chi_sentencizer.sentencize(chi_text)
    vi_sentencizer = Sentencizer(vi_split)
    vi_sentencizer.sentencize(vi_text)
    # Save data
    with open(f'{workdir}/chi.json', 'w') as json_file:
      json.dump(chi_sentencizer.result, json_file)
    with open(f'{workdir}/vi.json', 'w') as json_file:
      json.dump(vi_sentencizer.result, json_file)
    
    return jsonify({'message': 'Sentencized successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500



@api_blueprint.route('/chi-align', methods=['POST'])
def chi_align():
  try:
    # Validate request
    if 'id' not in request.get_json():
      return jsonify({'message': 'No ID provided'}), 400
    
    id = request.get_json()['id']
    workdir = f'data/{id}'
    
    # Align
    print(f'[*] Processing Chinese Aligning, ID: {id}')
    med_alginer = MEDAligner()
    try:
      med_alginer.align(f'{workdir}/chi.json', f'{workdir}/ocr.json')
    except FileNotFoundError:
      return jsonify({'message': 'ID not found'}), 404
    
    # Save data
    os.makedirs(workdir, exist_ok=True)
    with open(f'{workdir}/align.json', 'w') as json_file:
      json.dump(med_alginer.result, json_file)
    
    return jsonify({'message': 'Aligned successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500



@api_blueprint.route('/vi-align', methods=['POST'])
def vi_align():
  try:
    # Validate request
    if 'id' not in request.get_json():
      return jsonify({'message': 'No ID provided'}), 400
    
    id = request.get_json()['id']
    workdir = f'data/{id}'
    
    # Align
    print(f'[*] Processing Vietnamese Aligning: {id}')
    api_aligner = APIAligner()
    try:
      api_aligner.align(f'{workdir}/vi.json', f'{workdir}/align.json')
    except FileNotFoundError:
      api_aligner.align(f'{workdir}/vi.json', f'{workdir}/ocr.json')
    except FileNotFoundError:
      return jsonify({'message': 'ID not found'}), 404
    
    # Save data
    os.makedirs(workdir, exist_ok=True)
    with open(f'{workdir}/result.json', 'w') as json_file:
      json.dump(api_aligner.result, json_file)
    
    return jsonify({'message': 'Aligned successfully', 'id': id}), 200
  
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500
  
  

@api_blueprint.route('/result/<id>/<file>', methods=['GET'])
def result(id, file):
  try:
    if file == 'pdf':
      return send_file(f'../data/{id}/.pdf', as_attachment=True), 200
    elif file == 'json':
      return send_file(f'../data/{id}/result.json', as_attachment=True), 200
    elif file == 'xlsx':
      return send_file(f'../data/{id}/result.xlsx', as_attachment=True), 200
    else:    
      return jsonify({'message': 'Invalid requested file. Try pdf, json, or xlsx.'}), 400
  
  except OSError as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Resource not found'}), 404
  except Exception as e:
    print(f"An error occurred: {e}")
    return jsonify({'message': 'Internal server error.'}), 500
