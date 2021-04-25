from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS
from .api import api

app = Flask( __name__ )
jwt = JWTManager()
cors = CORS()
mail = Mail()

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'msg': 'De clic a este mensaje para iniciar sesión nuevamente.',
        'err': 'token_expired'
    }), 401

def create_app( config ):
    app.config.from_object( config )
    jwt.init_app( app )
    api.init_app( app )
    mail.init_app( app )
    cors.init_app( app )

    return app

