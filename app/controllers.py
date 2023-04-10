import json
from flask import Blueprint, render_template

index_bp = Blueprint('index', __name__)
products_bp = Blueprint('products', __name__)

@index_bp.route('/')
def index():
         return render_template('index.html')

@products_bp.route('/products')
def products():
         return 'Hi there backend is able to send responses'