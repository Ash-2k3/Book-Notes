from flask import Flask
from app import controllers
from app.database import db


def create_app():
    app = Flask(__name__)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    db.init_app(app)
    # Set up configuration for the app here
    app.config['DEBUG'] = True
    
    # Register the blueprints for endpoints in app instance
    app.register_blueprint(controllers.index_bp)
    app.register_blueprint(controllers.get_books_bp)
    app.register_blueprint(controllers.create_book_bp)

    return app
