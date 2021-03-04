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
    def search_food( cls, food_input, profile_id ):
        query = f"""
        SELECT food_id, food_name 
        FROM food 
        WHERE food_name LIKE '%{ food_input }%' AND (creator_id = 1 OR creator_id={profile_id});
        """
        rows = cursor.execute( query ).fetchall()
        foods_found = [ { 'food_id': food_id, 'food_name': food_name } for food_id, food_name in rows ]
        return foods_found

    @classmethod
    def food_exists( cls, food_name, profile_id ):
        query="""
        SELECT food_id
        FROM food
        WHERE food_name=? AND (creator_id=1 OR creator_id=?)
        """
        food = cursor.execute( query, ( food_name, profile_id ) ).fetchone()
        if food:
            return True
        return False


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

    @classmethod
    def create_food( cls, food_name, day_food_id, creator_id, food_measure_unit_id, food_calories, food_carbohydrates=None, food_fats=None, food_proteins=None ):
        create_food_query="""
        INSERT INTO food VALUES( ?, ?, ? );
        """
        cursor.execute( create_food_query, ( food_name, day_food_id, creator_id ) )

        # get the id of the food created reacently
        food_id = cursor.execute( "SELECT @@IDENTITY AS ID" ).fetchone()[0]

        create_food_measure_unit_query = """
        INSERT INTO food_measure_unit VALUES ( ?, ?, ?, ?, ?, ? );

        """
        cursor.execute( create_food_measure_unit_query, ( food_id, food_measure_unit_id, food_calories, food_carbohydrates, food_fats, food_proteins ) )

        cursor.commit()

        return "La comida se ha creado con éxito"
    @classmethod
    def regist_food( cls, profile_id, day_food_id, food_measure_unit_id, food_id, quantity ):
        query= """
        INSERT INTO food_register 
        ( profile_id, day_food_id, food_measure_unit_id, food_id, quantity ) 
        VALUES (?, ?, ?, ?, ? );
        """
        cursor.execute( query, ( profile_id, day_food_id, food_measure_unit_id, food_id, quantity ) )
        cursor.commit()
        return "Food Registed"


