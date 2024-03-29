import math
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import date, datetime
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
    def user_json( cls, user_id, user_name, user_email, role_id, created_at ):
        return { 
            'user_id': user_id, 
            'user_name': user_name, 
            'user_email': user_email, 
            'user_role': role_id,
            'created_at': str(created_at)
        }

    @classmethod
    def profile_json( cls, profile_id, user_id,w_level_id, profile_genre, profile_height, profile_actual_weight, profile_min_ideal_weight, profile_max_ideal_weight, profile_birthdate, profile_activity_level, profile_current_imc, profile_previous_imc, profile_have_caloric_plan, profile_caloric_plan, profile_initial_date_caloric_plan, profile_cancel_date_caloric_plan ):
        return { 
            'profile_id': profile_id, 
            'user_id': user_id, 
            'profile_genre': profile_genre, 
            'profile_height': profile_height, 
            'profile_actual_weight': float(profile_actual_weight) if profile_actual_weight else None, 
            'profile_min_ideal_weight': float(profile_min_ideal_weight) if profile_min_ideal_weight else None, 
            'profile_max_ideal_weight': float(profile_max_ideal_weight) if profile_max_ideal_weight else None, 
            'profile_birthdate': str(profile_birthdate) if profile_birthdate else None, 
            'profile_activity_level': profile_activity_level,
            'profile_current_imc': float(profile_current_imc) if profile_current_imc else None,
            'profile_previous_imc': float(profile_previous_imc) if profile_previous_imc else None,
            'profile_have_caloric_plan': profile_have_caloric_plan,
            'w_level_name': WeightLevel.get_weight_level_name_by_id( w_level_id ),
            'profile_caloric_plan': profile_caloric_plan,
            'profile_initial_date_caloric_plan': str(profile_initial_date_caloric_plan) if profile_initial_date_caloric_plan else None,
            'profile_cancel_date_caloric_plan': str(profile_cancel_date_caloric_plan) if profile_cancel_date_caloric_plan else None
        }

    @classmethod
    def calculate_imc( cls, height, actual_weight ):
        """
        Returns the imc, fixed to 2 decimals, according to the height and weight (in meters) of the user
        """
        return float("{:.1f}".format(actual_weight / ( height / 100 ) ** 2))

    @classmethod
    def calculate_age( cls, birthdate ):
        """
        Returns the age of the user according to his birthdate ( yyyy-mm-dd )
        """
        year, month, day = birthdate.split('-')
        today = date.today()
        return today.year - int(year) - ( ( today.month, today.day ) < ( int(month), int(day) ) )

    @classmethod
    def ideal_weight( cls, height ):
        """
        Returns the ideal weight of the user according to his genre and height (in meters)
        """
        # variation = 21 if genre == 'F' else 23
        # return math.ceil(( height / 100 ) ** 2 * variation)
        min_ideal_weight = 18.5 * ( height / 100 ) ** 2
        max_ideal_weight = 24.9 * ( height / 100 ) ** 2
        return { 
            "min": float('{:.1f}'.format(min_ideal_weight)),
            "max": float('{:.1f}'.format(max_ideal_weight))
        }

    @classmethod
    def cals_per_day( cls, actual_weight, w_level_id, height, birthdate, genre, activity_level ):
        """
        Returns how many calories the user have to consume per day
        """
        # GER = 0;
        # if genre == 'M':
        #     GER = 66.5 + 13.75 * actual_weight + 5 * height - 6.79 * cls.calculate_age( birthdate )
        # elif genre == 'F':
        #     GER = 655 + 9.56 * actual_weight + 1.85 * height - 4.68 * cls.calculate_age( birthdate )
        
        # return math.ceil(GER * cls.activity_level_factor( activity_level, genre ))
        age = cls.calculate_age( birthdate )
        activity_level_factor = cls.activity_level_factor( activity_level, genre )
        GER = 0 
        # FAO/WHO/UNU
        if w_level_id == 1 or w_level_id == 2:
            if age >= 18 and age <= 30:
                if genre == 'M':
                    GER = 15.3 * actual_weight + 679
                elif genre == 'F':
                    GER = 14.7 * actual_weight + 496
            elif age > 30:
                if genre == 'M':
                    GER = 11.6 * actual_weight + 879
                elif genre == 'F':
                    GER = 8.7 * actual_weight + 829
        elif w_level_id == 3:
            #Livingston
            if genre == 'M':
                GER = 293 * (actual_weight ** 0.4330) - 5.92 * age
            #Frankenfield
            elif genre == 'F':
                GER = actual_weight * 10 + height * 3 - age * 5 + 1 * 207 + 454
        elif w_level_id >= 4:
            if genre == 'M':
                # Bernstein
                GER = 11.02 * actual_weight + 10.23 * height - 5.8 * age - 1032
            elif genre == 'F':
                # Owen
                GER = actual_weight * 7.18 + 795
        GER *= activity_level_factor
        return math.ceil(GER)

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
                return 1.8
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
    
    def create_user_and_profile( self, created_at, profile_genre = None, profile_height = None, profile_actual_weight = None, profile_activity_level = None, profile_birthdate = None):
        """
        Create the user and the profile related with that user
        """
        query_user = "INSERT INTO users ( user_name, user_email, user_pass, role_id, created_at ) VALUES (?, ?, ?, ?, ?)" 
        hashed_pass = generate_password_hash( self.user_pass )

        cursor.execute( query_user, ( self.user_name, self.user_email, hashed_pass, self.role_id, created_at ) )

        # get the id of the user inserted recently
        user_id = cursor.execute( "SELECT @@IDENTITY AS ID" ).fetchone()[0]

        # If the user want to have a caloric plan he have to insert the following data
        if profile_genre and profile_height and profile_actual_weight and profile_activity_level: 
            profile_initial_date_caloric_plan = created_at
            profile_ideal_weight = self.ideal_weight( profile_height )
            profile_current_imc = self.calculate_imc( profile_height, profile_actual_weight )
            w_level_id = WeightLevel.get_weight_level_by_imc( profile_current_imc )[0]
            profile_caloric_plan = self.cals_per_day( profile_actual_weight, w_level_id, profile_height, profile_birthdate, profile_genre, profile_activity_level )
            query_profile = "INSERT INTO profile VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
            profile_have_caloric_plan = 1
            cursor.execute( query_profile, ( user_id, w_level_id, profile_genre, profile_height, profile_actual_weight, profile_ideal_weight['min'], profile_ideal_weight['max'], profile_birthdate, profile_activity_level, profile_current_imc, None, profile_have_caloric_plan,  profile_caloric_plan, profile_initial_date_caloric_plan, None ) )
        # if the user doesn't want to have a plan...
        else:
            query_profile = "INSERT INTO profile ( user_id, profile_have_caloric_plan ) VALUES ( ?, ? )"
            profile_have_caloric_plan = 0
            cursor.execute( query_profile, ( user_id, profile_have_caloric_plan ) )
        cursor.commit()
        return user_id

    @classmethod
    def update_profile_data( cls, profile_initial_date_caloric_plan, profile_id, profile_genre, profile_height, profile_actual_weight, profile_activity_level, profile_birthdate ): 
        # profile_ideal_weight = cls.ideal_weight( profile_height, profile_genre )
        profile_ideal_weight = cls.ideal_weight( profile_height )
        profile_current_imc = cls.calculate_imc( profile_height, profile_actual_weight )
        w_level_id = WeightLevel.get_weight_level_by_imc( profile_current_imc )[0]
        profile_caloric_plan = cls.cals_per_day( profile_actual_weight, w_level_id, profile_height, profile_birthdate, profile_genre, profile_activity_level )
        query = """
        UPDATE profile
        SET w_level_id = ?, profile_genre = ?, profile_height = ?, profile_actual_weight = ?, profile_min_ideal_weight = ?, profile_max_ideal_weight = ?, profile_birthdate = ?, profile_activity_level = ?, profile_previous_imc = (SELECT profile_current_imc FROM profile WHERE profile_id = ?), profile_current_imc = ?, profile_have_caloric_plan = 1, profile_caloric_plan = ?, profile_initial_date_caloric_plan = ?, profile_cancel_date_caloric_plan = NULL
        WHERE profile_id = ?
        """
        cursor.execute( query, ( w_level_id, profile_genre, profile_height, profile_actual_weight, profile_ideal_weight['min'], profile_ideal_weight['max'], profile_birthdate, profile_activity_level, profile_id, profile_current_imc, profile_caloric_plan, profile_initial_date_caloric_plan, profile_id) )
        cursor.commit()
        return "Datos actualizados"
        
    @classmethod
    def unsubscribe_caloric_plan( cls, profile_cancel_date_caloric_plan, profile_id ):
        unsubscribe_query = """
        UPDATE profile
        SET w_level_id = NULL, profile_genre = NULL, profile_height = NULL, profile_actual_weight = NULL, profile_min_ideal_weight = NULL, profile_max_ideal_weight = NULL, profile_birthdate = NULL, profile_activity_level = NULL, profile_current_imc = NULL, profile_previous_imc = NULL, profile_have_caloric_plan = 0, profile_caloric_plan = NULL, profile_initial_date_caloric_plan = NULL, profile_cancel_date_caloric_plan = ?
        WHERE profile_id = ?
        """
        cursor.execute(unsubscribe_query, ( profile_cancel_date_caloric_plan, profile_id ))
        cursor.commit()
        return "Ya no cuentas con plan calórico"

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
    def verify_email( cls, user_id, email ):
        query = """
        SELECT *
        FROM users
        WHERE user_id = ? AND user_email = ?
        """
        row = cursor.execute(query, (user_id, email)).fetchone()
        if row:
            return True
        return False

    @classmethod
    def change_email(cls, user_id, new_email):
        query = """
        UPDATE users
        SET user_email = ?
        WHERE user_id = ?
        """
        cursor.execute( query, (new_email, user_id ) )
        cursor.commit()
        return "El correo ha sido modificado"

    @classmethod
    def change_password(cls, user_id, password):
        query = """
        UPDATE users
        SET user_pass = ?
        WHERE user_id= ?
        """
        hashed_pass = generate_password_hash( password )
        cursor.execute( query, ( hashed_pass, user_id ) )
        return "La contraseña ha sido modificada"

    @classmethod
    def get_user_by_id( cls, user_id ):
        """
        Returns the user found according with the user_id parameter
        """
        query = "SELECT user_id, user_name, user_email, role_id, created_at FROM users WHERE user_id = ?"
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
        profile_ideal_weight = cls.ideal_weight( profile_height )
        profile_caloric_plan = cls.cals_per_day( profile_actual_weight, w_level[0], profile_height, profile_birthdate, profile_genre, profile_activity_level )
        diseases = Disease.get_diseases_by_w_level_id( w_level[0] )

        return {
            'profile_imc': profile_imc,
            'w_level_name': w_level[1],
            'posible_diseases': diseases,
            'profile_ideal_weight': f"{profile_ideal_weight['min']} - { profile_ideal_weight['max'] } kg",
            'profile_caloric_plan': profile_caloric_plan,
        }

    @classmethod
    def generate_code_to_restore( cls, email, code, current_day_and_hour ):
        query = """
        UPDATE users
        SET recovery_code = ?, code_expiration_time = DATEADD (hour, 1, ?)
        WHERE user_email = ?;
        """ 
        cursor.execute( query, ( code, current_day_and_hour, email ) )
        cursor.commit()
        return "El código enviado a su correo expira dentro de 1 hora"
    
    @classmethod
    def recovery_code_exists( cls, email, code ):
        query = """
        SELECT *
        FROM users
        WHERE user_email = ? AND recovery_code = ?
        """
        row = cursor.execute( query, ( email, code ) ).fetchone()
        if row:
            return True
        return False

    @classmethod
    def recovery_code_expires( cls, email ):
        query = """
        SELECT code_expiration_time
        FROM users
        WHERE user_email = ?
        """
        row = cursor.execute( query, ( email, ) ).fetchone()
        code_expiration_time = row[0]
        if datetime.now() < code_expiration_time:
            return True
        return False

    @classmethod
    def restore_password( cls, email, password ):
        query = """
        UPDATE users
        SET user_pass = ?, recovery_code = NULL, code_expiration_time = NULL
        WHERE user_email = ?
        """
        hashed_pass = generate_password_hash( password )
        cursor.execute(query, ( hashed_pass, email ))
        cursor.commit()
        return 'La contraseña ha sido restablecida'

    @classmethod
    def yesterday_fullfiled( cls, profile_id ):
        yesterday_calories_query = """
        SELECT ROUND(SUM(fmu.food_calories * fr.quantity),2) 'Calories'
        FROM food_register fr
        INNER JOIN food_measure_unit fmu ON fr.food_id = fmu.food_id
        WHERE fr.profile_id = ? AND fr.food_register_day = DATEADD(dd, -1, CAST(GETDATE() as date)) AND fr.food_measure_unit_id = fmu.food_measure_unit_id;
        """
        yesterday_calories = cursor.execute( yesterday_calories_query, ( profile_id, ) ).fetchone()[0]

        caloric_plan_query = """
        SELECT profile_caloric_plan 
        FROM profile 
        WHERE profile_id = ?;
        """

        caloric_plan = cursor.execute( caloric_plan_query, ( profile_id, ) ).fetchone()[0]

        if not yesterday_calories:
            return { "target": False, "has_calories": False }

        if caloric_plan * 0.90 <= yesterday_calories and caloric_plan * 1.10 >= yesterday_calories:
            return { "target": True, "has_calories": True, "message": "Ayer cumpliste con tu plan calórico. ¡Felicidades 🎉🎉!" }
        return { "target": False, "has_calories": True, "message": "Ayer no cumpliste con tu plan calórico. ¡Esfuerzate por coseguirlo hoy 💪!"}

    @classmethod
    def week_fullfiled( cls, profile_id ):
        caloric_plan_query = """
        SELECT profile_caloric_plan 
        FROM profile 
        WHERE profile_id = ?;
        """

        caloric_plan = cursor.execute( caloric_plan_query, ( profile_id, ) ).fetchone()[0]

        week_calories_query = """
        SELECT ROUND(SUM(fmu.food_calories * fr.quantity),2) 'Calories'
        FROM food_register fr
        INNER JOIN food_measure_unit fmu ON fr.food_id = fmu.food_id
        WHERE fr.profile_id = ? AND fr.food_register_day = DATEADD(dd, -?, CAST(GETDATE() as date)) AND fr.food_measure_unit_id = fmu.food_measure_unit_id;
        """
        for i in range(1,8):
            calories = cursor.execute(week_calories_query, ( profile_id, i )).fetchone()[0]
            if not calories or caloric_plan * 0.90 > calories or caloric_plan * 1.10 < calories:
                return { "target": False, "message": None  }
        return { "target": True, "message": "Conseguiste un gran logro, has cumplido tu plan calórico por 7 días seguidos, ¡Felicidades 🎉🎉!." }
