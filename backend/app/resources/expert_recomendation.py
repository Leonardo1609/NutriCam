from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ..models.expert_recomendations import ExpertRecommendation

class R_ExpertRecommendation( Resource ):
    @jwt_required()
    def get(self):
        try:
            recommendation = ExpertRecommendation.get_recommendation()
            return { 'recommendation': recommendation }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500


