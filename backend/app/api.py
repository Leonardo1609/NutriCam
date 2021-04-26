from flask_restful import Api
from .resources.schedule import R_Schedule, R_GetSchedule
from .resources.expert_recomendation import R_ExpertRecommendation
from .resources.review_rating import (
    ReviewsRatings,
    FirstReviewDate,
    ReviewRatingCrud,
    QuantityPerRating,
)
from .resources.administrator import (
    FirstDate, 
    Statistics, 
    UserInformationPrivate, 
    UserFoodRegistersPerDay, 
    UserImprovementStatistics, 
    UserNutritionSummaryPerDay,
    UserImprovementInformation
)
from .resources.user import (
    LoginUser, 
    UserExists, 
    SuccessCode,
    UserProfile, 
    ChangeEmail, 
    RegisterUser, 
    WeekFullfield,
    UpdateProfile,
    ChangePassword, 
    RestorePassword,
    SendRecoveryCode,
    YesterdayFullfiled,
    ProfileInformation, 
    UnsubscribeCaloricPlan
)
from .resources.food import (
    OwnFoods,
    CreateFood,
    RegistFood,
    FoodSearch, 
    FoodIdByName,
    UpdateOwnFood,
    RemoveOwnFood,
    WeeklyCalories, 
    FoodInformation, 
    FoodMeasureUnits,
    DeleteFoodRegist,
    OwnFoodInformation,
    FoodRegistersPerDay, 
    NutritionSummaryPerDay,
    ProcessImageToRecognition,
)

api = Api( prefix='/api' )

api.add_resource( LoginUser, '/login' )
api.add_resource( RegisterUser, '/regist-user' )
api.add_resource( UserProfile, '/user-profile' )
api.add_resource( UpdateProfile, '/update-profile' )
api.add_resource( ChangeEmail, '/change-email' )
api.add_resource( ChangePassword, '/change-password' )
api.add_resource( ProfileInformation, '/information' )
api.add_resource( UnsubscribeCaloricPlan, '/unsubscribe-caloric-plan' )
api.add_resource( FoodSearch, '/search/<string:food_input>' )
api.add_resource( FoodInformation, '/food/<int:food_id>/<int:measure_unit_id>' )
api.add_resource( FoodIdByName, '/food-id/<string:food_name>'  )
api.add_resource( OwnFoodInformation, '/own-food/<int:food_id>' )
api.add_resource( FoodMeasureUnits, '/measure-units/<int:food_id>' )
api.add_resource( CreateFood, '/create-food' )
api.add_resource( UpdateOwnFood, '/update-food/<string:food_id>' )
api.add_resource( RemoveOwnFood, '/remove-food/<string:food_id>' )
api.add_resource( RegistFood, '/regist-food' )
api.add_resource( DeleteFoodRegist, '/delete-regist/<int:food_register_id>' )
api.add_resource( FoodRegistersPerDay, '/registers-per-day/<string:day>' )
api.add_resource( NutritionSummaryPerDay, '/nutrition-summary/<string:day>'  )
api.add_resource( WeeklyCalories, '/weekly-summary/<string:date>' )
api.add_resource( UserExists, '/user-exists/<string:username>/<string:email>' )
api.add_resource( OwnFoods, '/own-foods' )
api.add_resource( ReviewRatingCrud, '/review-rating' )
api.add_resource( R_ExpertRecommendation, '/expert-recommendation' )
api.add_resource( R_Schedule, '/config-schedule' )
api.add_resource( R_GetSchedule, '/get-config-schedule' )
api.add_resource( ProcessImageToRecognition, '/recognize-image' )
api.add_resource( SendRecoveryCode, '/recovery-code/<string:email>' )
api.add_resource( SuccessCode, '/success-code/<string:email>' )
api.add_resource( RestorePassword, '/restore-password/<string:email>' )
api.add_resource( YesterdayFullfiled, '/yesterday-fullfiled' )
api.add_resource( WeekFullfield, '/week-fullfiled' )
api.add_resource( Statistics, '/statistics' )
api.add_resource( FirstDate, '/first-date' )
api.add_resource( QuantityPerRating, '/quantity-rating' )
api.add_resource( ReviewsRatings, '/reviews-per-rating' )
api.add_resource( FirstReviewDate, '/first-review-date' )
api.add_resource( UserImprovementStatistics, '/user-improvement-statistics' )
api.add_resource( UserImprovementInformation, '/user-improvement-information' )
api.add_resource( UserInformationPrivate, '/user-information-private/<int:user_id>' )
api.add_resource( UserFoodRegistersPerDay, '/user-registers-per-day/<int:user_id>/<string:day>' )
api.add_resource( UserNutritionSummaryPerDay, '/user-nutrition-summary/<int:user_id>/<string:day>' )
