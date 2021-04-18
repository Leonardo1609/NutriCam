from ..db import cursor

class Schedule:
    @classmethod
    def config_schedule( cls, schedule, profile_id ):
        for day_food_id, meal_time in schedule.items():
            query = """
            INSERT INTO meal_schedule
            VALUES(?,?,?)
            """
            cursor.execute( query, ( meal_time, day_food_id, profile_id ) )
            cursor.commit()

        return "Horario Configurado"

    @classmethod
    def update_schedule( cls, schedule, profile_id ):
        for day_food_id, meal_time in schedule.items():
            query="""
            SELECT meal_schedule_id
            FROM meal_schedule
            WHERE profile_id = ? AND day_food_id = ?
            """
            meal_schedule_id = cursor.execute( query, (profile_id, day_food_id) ).fetchone()[0]

            update_query = """
            UPDATE meal_schedule
            SET meal_time = ?
            WHERE meal_schedule_id = ?
            """
            cursor.execute( update_query, ( meal_time, meal_schedule_id ) )
            cursor.commit()

        return "Horario actualizado"
    @classmethod
    def get_schedule( cls, profile_id ):
        query = """
        SELECT meal_time, day_food_id
        FROM meal_schedule
        WHERE profile_id = ?
        """
        rows = cursor.execute( query, ( profile_id ) ).fetchall()

        schedule = [ { 'day_food_id': day_food_id, 'meal_time': meal_time.strftime("%H:%M") if meal_time else None } for meal_time, day_food_id in rows ]

        return schedule 



        
