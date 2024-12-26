from app.api import api_blueprint


@api_blueprint.route('/ocr')
def ocr():
  return "OCR"