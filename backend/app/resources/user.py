from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..db import cursor
from ..models.user import User
from ..email import restore_password_email
import random

class RegisterUser( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('user_name',
        type=str,
        required=True,
        help='El campo usuario es requerido'
    )
    parser.add_argument('user_email',
        type=str,
        required=True,
        help='El campo email es requerido'
    )
    parser.add_argument('user_pass',
        type=str,
        required=True,
        help='El campo contraseña es requerido'
    )
    parser.add_argument('profile_genre', 
        type=str
    )
    parser.add_argument('profile_height',
        type=int
    )
    parser.add_argument('profile_actual_weight',
        type=float
    )
    parser.add_argument('profile_birthdate',
        type=str
    )
    parser.add_argument('profile_activity_level',
        type=int
    )

    def post( self ):
        data = self.parser.parse_args()
        user = User( data['user_name'], data['user_email'], data['user_pass'] )

        try:
            if User.get_user_by_email( user.user_email ):
                return { 'msg': 'El correo ya se encuentra en uso' }, 400

            user_id = user.create_user_and_profile( profile_genre = data['profile_genre'], profile_height = data['profile_height'], profile_actual_weight = data['profile_actual_weight'], profile_activity_level = data['profile_activity_level'], profile_birthdate = data['profile_birthdate'] )
            access_token = create_access_token( identity = int( user_id ) )
            return { 'access_token': access_token }, 201
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UpdateProfile( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('profile_genre', 
        type=str
    )
    parser.add_argument('profile_height',
        type=int
    )
    parser.add_argument('profile_actual_weight',
        type=float
    )
    parser.add_argument('profile_birthdate',
        type=str
    )
    parser.add_argument('profile_activity_level',
        type=int
    )
    @jwt_required()
    def put( self ):
        data = self.parser.parse_args()
        print( data )
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = User.update_profile_data( profile_id, data['profile_genre'], data['profile_height'], data['profile_actual_weight'], data['profile_activity_level'], data['profile_birthdate'] )
            return { 'msg': message }
                 
        except:
            return {'msg': 'Ha ocurrido un error'}, 500

class LoginUser( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('user_email',
        type=str,
        required=True,
        help='Email field is required'
    )
    parser.add_argument('user_pass',
        type=str,
        required=True,
        help="Password field is required"
    )

    def post( self ):
        data = self.parser.parse_args()
        user = User.get_user_by_email( data['user_email'] )
        if not user:
            return { 'msg': 'Credenciales Inválidas' }, 400
        if not User.verify_password( data['user_email'], data['user_pass'] ):
            return { 'msg': 'Credenciales Inválidas' }, 400
        user_id = user[0] # ( id, username, email, role )
        access_token = create_access_token( identity = user_id )
        return { 'access_token': access_token }

class UserProfile( Resource ):
    @jwt_required()
    def get( self ):
        user_id = get_jwt_identity()
        user = User.get_user_by_id( user_id )
        profile = User.get_profile_by_user_id( user_id )
        return { 
            'user': user, 
            'profile': profile 
        }

class UserExists( Resource ):
    def get(self, username, email):
        try:
            # if User.get_user_by_name( username ):
            #     return { 'msg': f"El usuario con el nombre de usuario {username} ya existe" }
            if User.get_user_by_email( email ):
                return { 'msg': f"El correo {email} ya se encuentra en uso" }
            else:
                return False
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UnsubscribeCaloricPlan( Resource ):
    @jwt_required()
    def put(self):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = User.unsubscribe_caloric_plan( profile_id )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }

class ChangePassword( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('user_email',
            type=str,
            required=True,
            help="El campo correo es requerido")
    parser.add_argument('user_pass',
            type=str,
            required=True,
            help="El campo contraseña es requerido")
    parser.add_argument('new_password',
            type=str,
            required=True,
            help="El campo nueva contraseña es requerida")
    @jwt_required()
    def put(self):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()
            if not User.verify_email( user_id, data['user_email'] ):
                return { 'msg': 'Correo no válido' }, 400
            if not User.verify_password( data['user_email'], data['user_pass'] ):
                return { 'msg': 'Contraseña actual incorrecta' }, 400
            message = User.change_password( user_id, data['new_password'] )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }

class ChangeEmail( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('user_email',
            type=str,
            required=True,
            help="El campo correo es requerido")
    parser.add_argument('new_email',
            type=str,
            required=True,
            help="El campo nuevo correo es requerido")
    parser.add_argument('user_pass',
            type=str,
            required=True,
            help="El campo contraseña es requerido")

    @jwt_required()
    def put(self):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()

            if not User.verify_email( user_id, data['user_email'] ) or not User.verify_password( data['user_email'], data['user_pass'] ):
                return { 'msg': 'Credenciales inválidas' }, 400

            if User.get_user_by_email( data['new_email'] ):
                return { 'msg': 'El correo ya se encuentra en uso' }, 400

            message = User.change_email( user_id, data['new_email'] )

            return { 'msg': message }
                
        except:
            return { 'msg': 'Ha ocurrido un error' }

# Get the profile information before the user is created (IMC, ideal_weight, etc)
class ProfileInformation( Resource ):
    parser = reqparse.RequestParser()

    parser.add_argument('profile_genre', 
        type=str,
        required=True,
        help="El campo género es requerido"
    )
    parser.add_argument('profile_height',
        type=int,
        required=True,
        help="El campo altura es requerido"
    )
    parser.add_argument('profile_actual_weight',
        type=float,
        required=True,
        help="El campo peso actual es requerido"
    )
    parser.add_argument('profile_birthdate',
        type=str,
        required=True,
        help="El campo fecha de nacimiento es requerido"
    )
    parser.add_argument('profile_activity_level',
        type=int,
        required=True,
        help="El campo nivel de actividad es requerido"
    )

    def post( self ):
        try:
            data = self.parser.parse_args()
            information = User.get_profile_information_before_created( **data )
            return { 'information': information }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class SendRecoveryCode( Resource ):
    def post(self, email):
        try:
            user = User.get_user_by_email( email )

            if not user: 
                return { 'msg': 'El correo no se encuentra registrado' }, 404
            user = {
                'email': email,
                'username': user[1]
            }

            code = random.randrange(111111, 999999)
            message = User.generate_code_to_restore( email, code )
            restore_password_email( user, code )
            return { 'msg': message }
        except: 
            return { 'msg': 'Ha ocurrido un error' }, 500

class SuccessCode( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('recovery_code',
        type=str,
        required=True,
        help="El código es requerido"
    )

    def post(self, email):
        data = self.parser.parse_args()
        try:
            user = User.get_user_by_email( email )
            if not user: 
                return { 'msg': 'El correo no se encuentra registrado' }, 404

            if not User.recovery_code_exists( email, data['recovery_code'] ):
                return { 'msg': 'Código inválido' }, 400

            if not User.recovery_code_expires( email ):
                return { 'msg': 'Su código ha expirado' }, 400

            return { 'msg': 'Código válido' }, 200
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class RestorePassword( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('new_password',
        type=str,
        required=True,
        help="El contraseña es requerida"
    )
    def put( self, email ):
        data = self.parser.parse_args()
        try:
            user = User.get_user_by_email( email )
            if not user: 
                return { 'msg': 'El correo no se encuentra registrado' }, 404
            message = User.restore_password( email, data['new_password'] )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class YesterdayFullfiled( Resource ):
    @jwt_required()
    def get( self ):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            results = User.yesterday_fullfiled( profile_id )
            return results 
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class WeekFullfield( Resource ):
    @jwt_required()
    def get( self ):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            results = User.week_fullfiled( profile_id )
            return results
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
