from app import create_app, api
from flask_script import Manager, Server
from config import config

config_class = config['development']


app = create_app( config_class )

manager = Manager( app )
# manager.add_command('runserver', Server( host='192.168.42.51', port=8080) )

if __name__ == '__main__':
    manager.run()
