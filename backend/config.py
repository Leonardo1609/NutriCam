from decouple import config

class Config:
    SECRET_KEY = 'secret'

class DevelopmentConfig( Config ):
    DEBUG = True
    jWT_SECRET_KEY = 'secret'

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
