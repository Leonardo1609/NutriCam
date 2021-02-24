from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..db import cursor
from ..models.user import User

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

        if User.get_user_by_name( user.user_name ):
            return { 'msg': 'El nombre de usuario ya se encuentra en uso' }, 400

        if User.get_user_by_email( user.user_email ):
            return { 'msg': 'El email ya se encuentra en uso' }, 400

        try:
            user_id = user.create_user_and_profile( profile_genre = data['profile_genre'], profile_height = data['profile_height'], profile_actual_weight = data['profile_actual_weight'], profile_activity_level = data['profile_activity_level'], profile_birthdate = data['profile_birthdate'] )
            access_token = create_access_token( identity = int( user_id ) )
            return { 'access_token': access_token }, 201
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

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
        profile = User.get_profile_by_id( user_id )
        return { 
            'user': user, 
            'profile': profile 
        }

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
        data = self.parser.parse_args()
        information = User.get_profile_before_created_information( **data )
        return { 'information': information }
