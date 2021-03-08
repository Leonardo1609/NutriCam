from flask_restful import Api
from .resources.user import RegisterUser, UserProfile, LoginUser, ProfileInformation
from .resources.food import FoodSearch, FoodInformation, CreateFood, RegistFood, DeleteFoodRegist, FoodRegistersPerDay, NutritionSummaryPerDay

api = Api( prefix='/api' )

api.add_resource( RegisterUser, '/regist-user' )
api.add_resource( UserProfile, '/user-profile' )
api.add_resource( LoginUser, '/login' )
api.add_resource( ProfileInformation, '/information' )
api.add_resource( FoodSearch, '/search/<string:food_input>' )
api.add_resource( FoodInformation, '/food/<int:food_id>' )
api.add_resource( CreateFood, '/create-food' )
api.add_resource( RegistFood, '/regist-food' )
api.add_resource( DeleteFoodRegist, '/delete-regist/<int:food_register_id>' )
api.add_resource( FoodRegistersPerDay, '/registers-per-day/<string:day>' )
api.add_resource( NutritionSummaryPerDay, '/nutrition-summary/<string:day>'  )
