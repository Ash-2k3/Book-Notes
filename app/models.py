from app import db

class BookEntity(db.Model):
         id = db.Column(db.Integer, primary_key=True)
         book_name = db.Column(db.String(50))

         def __init__(self, book_name):
                  self.book_name = book_name

         def save_book_info(self):
                  db.session.add(self)
                  db.session.commit()
         
         def get_list_of_books():
                  books = db.session.execute(db.select(BookEntity)).scalars()
                  return books
             