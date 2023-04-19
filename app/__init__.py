from flask import Flask
from app import controllers


def create_app():
    app = Flask(__name__)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    # set up configuration for the app here
    app.config['DEBUG'] = True
    app.register_blueprint(controllers.index_bp)
    app.register_blueprint(controllers.products_bp)

    return app
