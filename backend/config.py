from decouple import config
from datetime import timedelta
from dotenv import load_dotenv
import os
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or ''

class DevelopmentConfig( Config ):
    DEBUG = True
    PROPAGATE_EXECPTIONS = True
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or ''
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=15) 

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv("MAIL_USERNAME") or 'nutricamtp@gmail.com'
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD") or '' 
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

class ProductionConfig( Config ):
    DEBUG = True
    PROPAGATE_EXECPTIONS = True
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or ''
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=15) 

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv("MAIL_USERNAME") or 'nutricamtp@gmail.com'
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD") or '' 
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    
config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig,
    'production': ProductionConfig
}
