from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()


@app.route('/')
def ping():
  return jsonify({'message': 'I am alive'}), 200


from app.api import api_blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')
