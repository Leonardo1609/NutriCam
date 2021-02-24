from flask_restful import Api
from .resources.user import RegisterUser, UserProfile, LoginUser, ProfileInformation
from .resources.food import FoodSearch, FoodInformation

api = Api( prefix='/api' )

api.add_resource( RegisterUser, '/regist-user' )
api.add_resource( UserProfile, '/user-profile' )
api.add_resource( LoginUser, '/login' )
api.add_resource( ProfileInformation, '/information' )
api.add_resource( FoodSearch, '/search/<string:food_input>' )
api.add_resource( FoodInformation, '/food/<int:food_id>' )
