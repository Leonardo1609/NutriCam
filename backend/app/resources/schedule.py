from flask_restful import Resource, reqparse 
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.schedule import Schedule
from ..models.user import User

class R_Schedule( Resource ):
    parser = reqparse.RequestParser()
    parser.add_argument('schedule', 
        type=dict,
        required=True,
        help="El horario de comidas es requerido"
    )

    @jwt_required()
    def post( self ):
        data = self.parser.parse_args() 
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = Schedule.config_schedule( data['schedule'], profile_id )
            schedule = Schedule.get_schedule( profile_id )
            return { 'msg': message, "schedule": schedule }, 200
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
    @jwt_required()
    def put(self):
        data = self.parser.parse_args() 
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            message = Schedule.update_schedule( data['schedule'], profile_id )
            schedule = Schedule.get_schedule( profile_id )
            return { 'msg': message, 'schedule': schedule }, 200
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
        
        
class R_GetSchedule( Resource ):
    @jwt_required()
    def get( self ):
        try:
            user_id = get_jwt_identity()
            profile_id = User.get_profile_id_by_user_id( user_id )
            schedule = Schedule.get_schedule( profile_id )
            return { 'schedule': schedule }
        except:
            return { 'msg': 'Ha ocurrido un error' }, 500
