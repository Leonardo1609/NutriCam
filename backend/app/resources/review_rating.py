from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.review_rating import ReviewRating
from ..models.user import User

class ReviewRatingCrud( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('rating', 
        type=int, 
        required=True,
        help="El campo puntuación es requerido")
    parser.add_argument('review', type=str)

    @jwt_required()
    def get( self ):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            review_rating = ReviewRating.get_review_and_rating( profile_id )
            return {
                'review_rating': review_rating
            }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

    @jwt_required()
    def post(self):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            review_rating_id = ReviewRating.post_review_and_rating( profile_id, data['rating'], data['review'] )
            return {
                'msg': 'Puntuación y reseña enviada',
                'review_rating_id': int(review_rating_id)
            }, 200
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

    @jwt_required()
    def put(self):
        data = self.parser.parse_args()
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = ReviewRating.modify_review_and_rating( profile_id, data['rating'], data['review'] )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500

    @jwt_required()
    def delete( self ):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = ReviewRating.delete_review_and_rating( profile_id )
            return { 'msg': message }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500


