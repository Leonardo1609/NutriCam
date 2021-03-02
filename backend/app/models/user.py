from werkzeug.security import check_password_hash, generate_password_hash
from datetime import date
from ..db import cursor
from .disease import Disease
from .weight_level import WeightLevel

class User:
    role_id = 2
    def __init__( self, user_name, user_email, user_pass ):
        self.user_name = user_name
        self.user_email = user_email
        self.user_pass = user_pass

    @classmethod
    def user_json( cls, user_id, user_name, user_email, role_id ):
        return { 
            'user_id': user_id, 
            'user_name': user_name, 
            'user_email': user_email, 
            'user_role': role_id 
        }

    @classmethod
    def profile_json( cls, profile_id, user_id, profile_genre, profile_height, profile_actual_weight, profile_ideal_weight, profile_birthdate, profile_activity_level, profile_imc, profile_nutritional_plan, w_level_id, profile_caloric_plan ):
        return { 
            'profile_id': profile_id, 
            'user_id': user_id, 
            'profile_genre': profile_genre, 
            'profile_height': profile_height, 
            'profile_actual_weight': float(profile_actual_weight), 
            'profile_ideal_weight': float(profile_ideal_weight), 
            'profile_birthdate': str(profile_birthdate), 
            'profile_activity_level': profile_activity_level,
            'profile_imc': float(profile_imc),
            'profile_nutritional_plan': profile_nutritional_plan,
            'w_level_name': WeightLevel.get_weight_level_name_by_id( w_level_id ),
            'profile_caloric_plan': profile_caloric_plan
        }

    @classmethod
    def calculate_imc( cls, height, actual_weight ):
        """
        Returns the imc according to the height and weight (in meters) of the user
        """
        return actual_weight / ( height / 100 ) ** 2

    @classmethod
    def calculate_age( cls, birthdate ):
        """
        Returns the age of the user according to his birthdate ( yyyy-mm-dd )
        """
        year, month, day = birthdate.split('-')
        today = date.today()
        return today.year - int(year) - ( ( today.month, today.day ) < ( int(month), int(day) ) )

    @classmethod
    def ideal_weight( cls, height, genre ):
        """
        Returns the ideal weight of the user according to his genre and height (in meters)
        """
        variation = 21 if genre == 'F' else 23
        return ( height / 100 ) ** 2 * variation

    @classmethod
    def cals_per_day( cls, actual_weight, height, birthdate, genre, activity_level ):
        """
        Returns how many calories the user have to consume per day
        """
        GER = 0;
        if genre == 'M':
            GER = 66.5 + 13.75 * actual_weight + 5 * height - 6.79 * cls.calculate_age( birthdate )
        elif genre == 'F':
            GER = 655 + 9.56 * actual_weight + 1.85 * height - 4.68 * cls.calculate_age( birthdate )
        
        return GER * cls.activity_level_factor( activity_level, genre )

    @classmethod
    def activity_level_factor( cls, activity_level, genre ):
        """
        Returns the activity_level_factor according to the activity level and genre

        """
        if genre == 'M':
            if activity_level == 1:
                return 1.2
            if activity_level == 2:
                return 1.55
            if activity_level == 3:
                return 1.78
            if activity_level == 4:
                return 2.10

        if genre == 'F':
            if activity_level == 1:
                return 1.2
            if activity_level == 2:
                return 1.56
            if activity_level == 3:
                return 1.64
            if activity_level == 4:
                return 1.82
    
    def create_user_and_profile( self, profile_genre = None, profile_height = None, profile_actual_weight = None, profile_activity_level = None, profile_birthdate = None ):
        """
        Create the user and the profile related with that user
        """
        query_user = "INSERT INTO users ( user_name, user_email, user_pass, role_id ) VALUES (?, ?, ?, ?)" 
        hashed_pass = generate_password_hash( self.user_pass )

        cursor.execute( query_user, ( self.user_name, self.user_email, hashed_pass, self.role_id ) )

        # get the id of the user inserted recently
        user_id = cursor.execute( "SELECT @@IDENTITY AS ID" ).fetchone()[0]

        # If the user want to have a nutritional plan he have to insert the following data
        if profile_genre and profile_height and profile_actual_weight and profile_activity_level: 
            profile_ideal_weight = self.ideal_weight( profile_height, profile_genre )
            profile_imc = self.calculate_imc( profile_height, profile_actual_weight )
            profile_nutritional_plan = 1
            w_level_id = WeightLevel.get_weight_level_by_imc( profile_imc )[0]
            profile_caloric_plan = self.cals_per_day( profile_actual_weight, profile_height, profile_birthdate, profile_genre, profile_activity_level )
            query_profile = "INSERT INTO profile VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
            profile_nutritional_plan = 1
            cursor.execute( query_profile, ( user_id, profile_genre, profile_height, profile_actual_weight, profile_ideal_weight, profile_birthdate, profile_activity_level, profile_imc, profile_nutritional_plan, w_level_id, profile_caloric_plan ) )
        # if the user doesn't want to have a plan...
        else:
            query_profile = "INSERT INTO profile ( user_id, profile_nutritional_plan ) VALUES ( ?, ? )"
            profile_nutritional_plan = 0
            cursor.execute( query_profile, ( user_id, profile_nutritional_plan ) )
        cursor.commit()
        return user_id

    @classmethod
    def get_user_by_name( cls, user_name ):
        """
        Returns the user found according with the user_name parameter
        """
        query = "SELECT user_id, user_name, user_email, role_id FROM users WHERE user_name = ?"
        user = cursor.execute( query, ( user_name, ) ).fetchone()
        return user

    @classmethod
    def get_user_by_email( cls, email ):
        """
        Returns the user found according with the user_name parameter
        """
        query = "SELECT user_id, user_name, user_email, role_id FROM users WHERE user_email = ?"
        user = cursor.execute( query, ( email, ) ).fetchone()
        return user
    
    @classmethod
    def verify_password( cls, email, password_from_login ):
        """
        Returns true if the password inserted by the user and the password in the database match
        """
        query = "SELECT user_pass FROM users where user_email = ?"
        hashed_password = cursor.execute( query, ( email, ) ).fetchone()[0]
        return check_password_hash( hashed_password, password_from_login)

    @classmethod
    def get_user_by_id( cls, user_id ):
        """
        Returns the user found according with the user_id parameter
        """
        query = "SELECT user_id, user_name, user_email, role_id FROM users WHERE user_id = ?"
        user = cursor.execute( query, ( user_id, ) ).fetchone()
        return cls.user_json( *user )

    @classmethod
    def get_profile_by_user_id( cls, user_id ):
        """
        Returns the profile found according with the user_id parameter
        """
        query = "SELECT * FROM profile where user_id = ?"
        profile = cursor.execute( query, ( user_id, ) ).fetchone()
        return cls.profile_json( *profile )

    @classmethod
    def get_profile_id_by_user_id( cls, user_id ):
        """
        Returns the profile id found according with the user_id parameter
        """
        query = "SELECT profile_id from profile where user_id=?"
        profile = cursor.execute( query, ( user_id, ) ).fetchone()
        return profile[0]

    @classmethod
    def get_profile_information_before_created( cls, profile_genre, profile_height, profile_actual_weight, profile_birthdate, profile_activity_level ):
        """
        Returns all information according to the user data before his registered in the app
        """
        profile_imc = cls.calculate_imc( profile_height, profile_actual_weight )
        w_level = WeightLevel.get_weight_level_by_imc( profile_imc )
        profile_ideal_weight = cls.ideal_weight( profile_height, profile_genre )
        profile_caloric_plan = cls.cals_per_day( profile_actual_weight, profile_height, profile_birthdate, profile_genre, profile_activity_level )
        diseases = Disease.get_diseases_by_w_level_id( w_level[0] )
        return {
                'profile_imc': profile_imc,
                'w_level_name': w_level[1],
                'posible_diseases': diseases,
                'profile_ideal_weight': profile_ideal_weight,
                'profile_caloric_plan': profile_caloric_plan,
        }
