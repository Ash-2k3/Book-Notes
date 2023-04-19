from flask import Flask
from app import controllers
from app.database import db


def create_app():
    app = Flask(__name__)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    db.init_app(app)
    # set up configuration for the app here
    app.config['DEBUG'] = True
    app.register_blueprint(controllers.index_bp)
    app.register_blueprint(controllers.products_bp)
    app.register_blueprint(controllers.search_book_bp)
    app.register_blueprint(controllers.store_data_bp)
    app.register_blueprint(controllers.create_book_bp)

    return app
