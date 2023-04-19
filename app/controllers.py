from flask import request
from flask import jsonify
from flask import Blueprint, render_template
from app.models import BookEntity
import json

index_bp = Blueprint('index', __name__)
products_bp = Blueprint('products', __name__)
search_book_bp = Blueprint('search_book', __name__)
store_data_bp = Blueprint('store_book',__name__ )
create_book_bp = Blueprint('create_book', __name__)

@index_bp.route('/')
def index():
         return render_template('index.html')

@products_bp.route('/products')
def products():
         return 'Hi there backend is able to send responses'

@store_data_bp.route('/save-book-info')
def get_books():
         books = BookEntity.get_list_of_books()
         book_dict = [{'book_name': book.book_name} for book in books]
         return jsonify(book_dict,200)

@create_book_bp.route('/create-book', methods=['POST'])
def create_books():
         book_name = request.json.get('book_name')

         if not book_name:
                  return
         book = BookEntity(book_name = book_name)
         book.save_book_info()
         return jsonify({'message': 'Book created successfully'}), 201
