from flask import request
from flask import jsonify
from flask import Blueprint, render_template
from app.models import BookEntity
import json

index_bp = Blueprint('index', __name__)
get_books_bp = Blueprint('get_books',__name__ )
create_book_bp = Blueprint('create_book', __name__)

@index_bp.route('/')
def index():
         # Render the index.html (landing page)
         return render_template('index.html')

@get_books_bp.route('/save-book-info')
def get_books():
         # Get list of existing books from db
         books = BookEntity.get_list_of_books()
         book_dict = [{'book_name': book.book_name} for book in books]
         return jsonify(book_dict,200)

@create_book_bp.route('/create-book', methods=['POST'])
def create_books():
         # Create and save instance of a book in db
         book_name = request.json.get('book_name')

         if not book_name:
                  return
         book = BookEntity(book_name = book_name)
         book.save_book_info()
         return jsonify({'message': 'Book created successfully'}), 201
