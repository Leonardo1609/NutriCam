from decouple import config
from datetime import timedelta

class Config:
    SECRET_KEY = 'secret'

class DevelopmentConfig( Config ):
    DEBUG = True
    PROPAGATE_EXECPTIONS = True
    jWT_SECRET_KEY = 'secret'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=15) 

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'nutricamtp@gmail.com'
    MAIL_PASSWORD = 'u201510756' 
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    
config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
