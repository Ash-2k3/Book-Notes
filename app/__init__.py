from flask import Flask
from app import controllers


def create_app():
    app = Flask(__name__)

    # set up configuration for the app here
    app.config['DEBUG'] = True
    app.register_blueprint(controllers.index_bp)
    app.register_blueprint(controllers.products_bp)

    return app
