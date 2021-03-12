from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse
from ..models.food import Food
from ..models.user import User

class FoodSearch( Resource ):
    @jwt_required()
    def get( self, food_input ):
        user_id = get_jwt_identity()
        profile_id = User.get_profile_id_by_user_id( user_id )
        try:
            foods_found = Food.search_food( food_input, profile_id )
            return { 'foods_found': foods_found }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class FoodInformation( Resource ):
    @jwt_required()
    def get( self, food_id ):
        try:
            food_information = Food.get_food_information( food_id )
            return { 'food_information': food_information }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class CreateFood( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('food_name',
        type=str,
        required=True,
        help="El campo nombre comida es requerido"
    )
    parser.add_argument('food_measure_unit_id',
        type=int,
        required=True,
        help="El campo unidad de medida es requerido"
    )
    parser.add_argument('food_calories',
        type=float,
        required=True,
        help="El campo calorías es requerido"
    )
    parser.add_argument('food_carbohydrates', type=float)
    parser.add_argument('food_fats', type=float)
    parser.add_argument('food_proteins', type=float)
    
    @jwt_required()
    def post(self):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            if Food.food_exists( data['food_name'], profile_id ):
                return { 'msg': "La comida ya existe" }, 409
            message = Food.create_food( data['food_name'], 1, profile_id, data['food_measure_unit_id'], data['food_calories'], data['food_carbohydrates'], data['food_fats'], data['food_proteins'] )
            return { 'msg': message }, 201
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class RegistFood( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('day_food_id',
        type=int,
        required=True,
        help="El campo comida del día es requierido"
    )
    parser.add_argument('food_measure_unit_id', 
        type=int,
        required=True,
        help="El campo unidad del medida es requerido"
    )
    parser.add_argument('food_id',
        type=int,
        required=True,
        help="El campo nombre de comida es requerido"
    )
    parser.add_argument('quantity',
        type=float,
        required=True,
        help="El campo cantidad de porciones es requerido"
    )

    @jwt_required()
    def post(self):
        data = self.parser.parse_args()
        user_id = get_jwt_identity()
        try:
            profile_id = User.get_profile_id_by_user_id( user_id )
            food_register_id = Food.regist_food( profile_id, **data )
            return { 'food_register_id': food_register_id }
        except:
            return {'msg': 'Ha ocurrido un error'}, 500


class DeleteFoodRegist( Resource ):
    @jwt_required()
    def delete(self, food_register_id):
        try:
            message = Food.delete_food_regist( food_register_id )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500


class FoodRegistersPerDay( Resource ):
    @jwt_required()
    def get(self, day):
        user_id = get_jwt_identity() 
        try:
            profile_id = User.get_profile_id_by_user_id( user_id )
            registers = Food.food_registers_per_day( profile_id, day )
            return { 'food_registers': registers }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

class NutritionSummaryPerDay( Resource ):
    @jwt_required()
    def get(self, day):
        user_id = get_jwt_identity()
        try:
            profile_id = User.get_profile_id_by_user_id( user_id )
            Food.nutrition_summary_per_day( profile_id, day )
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500


