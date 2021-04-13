from flask import Flask
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS
from .api import api

app = Flask( __name__ )
jwt = JWTManager()
cors = CORS()
mail = Mail()

def create_app( config ):
    app.config.from_object( config )
    jwt.init_app( app )
    api.init_app( app )
    mail.init_app( app )
    cors.init_app( app )

    return app

