from flask_mail import Message
from flask import current_app
from config import config

def restore_password_email(user, code):
    from . import mail
    message = Message('Reestablecer contraseña',
            sender = config['development'].MAIL_USERNAME,
            recipients = [user['email']])
    message.html = '<p>Hola '+ user['username'] + ' el código para reestablecer tu contraseña es <strong>' + str(code) + '</strong></p>'
    mail.send( message )
    
