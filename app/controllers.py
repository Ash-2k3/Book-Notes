from ast import Pass
import re
from flask import request
from flask import jsonify
from flask import Blueprint, render_template
from app.models import BookEntity
from config import BOOK_API_KEY
import requests
import json

index_bp = Blueprint('index', __name__)
get_books_bp = Blueprint('get_books',__name__ )
create_book_bp = Blueprint('create_books', __name__)
get_related_books_from_books_api = Blueprint('', __name__)

@index_bp.route('/')
def index():
         # Render the index.html (landing page)
         return render_template('index.html')

@get_books_bp.route('/get-books')
def get_books():
         # Get list of existing books from db
         books = BookEntity.get_list_of_books()
         book_dict = [{'book_name': book.book_name} for book in books]
         return jsonify(book_dict), 200

@create_book_bp.route('/create-book', methods=['POST'])
def create_books():
         # Create and save instance of a book in db
         book_name = request.json.get('book_name')

         if not book_name:
                  return
         book = BookEntity(book_name = book_name)
         book.save_book_info()
         return jsonify({'message': 'Book created successfully'}), 201


@get_related_books_from_books_api.route('/search-book-info')
def search_book():
         search_params = {
                  'q': 'flowers',
                  'key': str(BOOK_API_KEY)
         }
         response = requests.get(url='https://www.googleapis.com/books/v1/volumes', params=search_params)

         if response.status_code == 200:
                  data = response.json()
                  return data
         else:
                  return 'Error: {}'.format(response.status_code)
