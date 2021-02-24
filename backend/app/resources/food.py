from flask_jwt_extended import jwt_required
from flask_restful import Resource
from ..models.food import Food

class FoodSearch( Resource ):
    @jwt_required()
    def get( self, food_input ):
        try:
            foods_found = Food.search_food( food_input )
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
