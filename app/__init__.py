from flask import Flask
from app import controllers
from app.database import db


def create_app():
    app = Flask(__name__)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test1.db"
    # with app.app_context:
    #     db.create_all()
    db.init_app(app)
    # Set up configuration for the app here
    app.config['DEBUG'] = True

    @app.before_first_request
    def create_tables():
        db.create_all()
    
    # Register the blueprints for endpoints in app instance
    app.register_blueprint(controllers.index_bp)
    app.register_blueprint(controllers.get_books_bp)
    app.register_blueprint(controllers.create_book_bp)
    app.register_blueprint(controllers.search_book_bp)

    return app
