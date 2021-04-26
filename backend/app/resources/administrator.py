from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from ..models.administrator import Administration
from ..models.user import User
from ..models.food import Food

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

class UserImprovementStatistics( Resource ):
    @jwt_required()
    def get( self ):
        try:
            user_id = get_jwt_identity()
            if not Administration.is_administrator( user_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            results = Administration.get_quantity_users_improvement()
            return { "quantity_users_improvement": results }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UserImprovementInformation( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('case', type=str)

    @jwt_required()
    def post(self):
        try:
            data = self.parser.parse_args()
            user_id = get_jwt_identity()
            if not Administration.is_administrator( user_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            results = Administration.get_users_improvement(data['case'])
            return { "users_improvement": results }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UserInformationPrivate( Resource ):
    @jwt_required()
    def get(self, user_id):
        try:
            admin_id = get_jwt_identity()
            if not Administration.is_administrator( admin_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            user_information = User.get_user_by_id( user_id )
            profile_information = User.get_profile_by_user_id( user_id )
            return { 'user': user_information, 'profile': profile_information }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UserFoodRegistersPerDay( Resource ):
    @jwt_required()
    def get( self, user_id, day ):
        try:
            admin_id = get_jwt_identity()
            if not Administration.is_administrator( admin_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            profile_id = User.get_profile_id_by_user_id( user_id )
            registers = Food.food_registers_per_day( profile_id, day )
            return { 'food_registers': registers }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class UserNutritionSummaryPerDay( Resource ):
    @jwt_required()
    def get( self, user_id, day ):
        try:
            admin_id = get_jwt_identity()
            if not Administration.is_administrator( admin_id ):
                return { 'msg': 'No cumple con los privilegios' }, 400
            profile_id = User.get_profile_id_by_user_id( user_id )
            summary = Food.nutrition_summary_per_day( profile_id, day )
            return { 'summary': summary }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
