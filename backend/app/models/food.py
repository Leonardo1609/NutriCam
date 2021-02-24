from ..db import cursor
class Food:
    @classmethod
    def food_json( cls, food_id, food_name, food_calories, food_fats, food_carbohydrates, food_proteins, day_food_id ):
        return {
            'food_id': food_id,
            'food_name': food_name,
            'food_calories': food_calories,
            'food_fats': food_fats,
            'food_carbohydrates': food_carbohydrates,
            'food_proteins': food_proteins,
            'day_food_id': day_food_id
        }
        
    @classmethod
    def search_food( cls, food_input ):
        query = f"""
        SELECT food_id, food_name 
        FROM food 
        WHERE food_name LIKE '%{ food_input }%' AND creator_id = 1;
        """
        rows = cursor.execute( query ).fetchall()
        foods_found = [ { 'food_id': food_id, 'food_name': food_name } for food_id, food_name in rows ]
        return foods_found
    @classmethod
    def get_food_information( cls, food_id ):
        query = """
        SELECT f.food_id, f.food_name, fmu.food_calories, fmu.food_fats, fmu.food_carbohydrates, fmu.food_proteins, df.day_food_id
        FROM food_measure_unit fmu
        INNER JOIN  food f ON f.food_id = fmu.food_id
        INNER JOIN  day_food df ON df.day_food_id = f.day_food_id
        WHERE f.food_id = ?;
        """
        food_information = cursor.execute( query, ( food_id, ) ).fetchone()
        return cls.food_json( *food_information )

