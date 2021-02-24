from decouple import config

class Config:
    SECRET_KEY = 'secret'

class DevelopmentConfig( Config ):
    DEBUG = True
    jWT_SECRET_KEY = 'secret'
    
config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
