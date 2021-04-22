from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from ..models.administrator import Administration

class Statistics( Resource ):
    parser = reqparse.RequestParser() 
    parser.add_argument('initial_date', type=str)
    parser.add_argument('last_date', type=str)

    @jwt_required()
    def post( self ):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()
            if not Administration.is_administrator( user_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            resp = Administration.users_quantity_with_and_without_caloric_plan( data['initial_date'], data['last_date'] )
            return { 'quantity_users': resp }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class FirstDate( Resource ):
    @jwt_required()
    def get( self ):
        try:
            first_date = Administration.first_user_created_at_date()
            return { 'first_date': str(first_date) }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
