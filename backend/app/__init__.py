from flask import Flask
from flask_jwt_extended import JWTManager
from .api import api

app = Flask( __name__ )
jwt = JWTManager()

def create_app( config ):
    app.config.from_object( config )
    jwt.init_app( app )
    api.init_app( app )

    return app

