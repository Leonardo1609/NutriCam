from ..db import cursor
from datetime import date, timedelta

def getCaloriesOfDay( input_day, date_calories ):
    for calories, day in date_calories:
        if( str(day) == input_day ):
            return calories
    return 0

class Food:
    @classmethod
    def food_json( cls, food_id, food_name, food_calories, food_fats, food_carbohydrates, food_proteins , measure_unit_id, measure_name, listed_food, creator_id):
        return {
            'food_id': food_id,
            'food_name': food_name,
            'food_calories': food_calories,
            'food_fats': food_fats,
            'food_carbohydrates': food_carbohydrates,
            'food_proteins': food_proteins,
            'measure_unit_id': measure_unit_id,
            'measure_name': measure_name,
            'listed_food': listed_food,
            'creator_id': creator_id
        }
        
    @classmethod
    def search_food( cls, food_input, profile_id ):
        query = f"""
        SELECT TOP 20 food_id, food_name
        FROM food 
        WHERE food_name LIKE '%{ food_input }%' AND (creator_id = 1 OR creator_id={profile_id}) AND listed_food = 1
        ORDER BY creator_id DESC;
        """
        rows = cursor.execute( query ).fetchall()
        foods_found = [ { 'food_id': food_id, 'food_name': food_name } for food_id, food_name in rows ]
        return foods_found

    @classmethod
    def food_exists( cls, food_name, profile_id ):
        query="""
        SELECT food_id
        FROM food
        WHERE food_name=? AND (creator_id=1 OR creator_id=?) AND listed_food = 1
        """
        food = cursor.execute( query, ( food_name, profile_id ) ).fetchone()
        if food:
            return True
        return False

    # If another food, besides of the food with this id, has the same name
    @classmethod
    def another_food_exists( cls, food_id, food_name, profile_id ):
        query="""
        SELECT food_id
        FROM food
        WHERE food_id != ? AND food_name=? AND (creator_id=1 OR creator_id=?) and listed_food = 1
        """
        food = cursor.execute( query, ( food_id, food_name, profile_id ) ).fetchone()

        if food:
            return True
        return False

    @classmethod
    def get_measure_units( cls, food_id ):
        query="""
        SELECT mu.measure_unit_id, mu.measure_name
        FROM food_measure_unit fmu
        INNER JOIN measure_unit mu ON mu.measure_unit_id = fmu.food_measure_unit_id
        INNER JOIN food f ON f.food_id = fmu.food_id
        WHERE f.food_id = ?;
        """
        rows = cursor.execute( query, ( food_id, ) ).fetchall()
        measure_units = [ { 'measure_unit_id': measure_unit_id, 'measure_name': measure_name } for measure_unit_id, measure_name in rows ]
        return measure_units

    @classmethod
    def get_own_food_information( cls, food_id ):
        query="""
        SELECT f.food_id, f.food_name, fmu.food_calories, fmu.food_fats, fmu.food_carbohydrates, fmu.food_proteins, mu.measure_unit_id, mu.measure_name, f.listed_food, f.creator_id
        FROM food_measure_unit fmu
        INNER JOIN measure_unit mu ON mu.measure_unit_id = fmu.food_measure_unit_id
        INNER JOIN food f ON f.food_id = fmu.food_id
        WHERE f.food_id = ?;
        """
        food_information = cursor.execute( query, ( food_id, ) ).fetchone()
        return cls.food_json( *food_information )

    @classmethod
    def get_food_information( cls, food_id, measure_unit_id ):
        query = """
        SELECT f.food_id, f.food_name, fmu.food_calories, fmu.food_fats, fmu.food_carbohydrates, fmu.food_proteins, mu.measure_unit_id, mu.measure_name, f.listed_food, f.creator_id
        FROM food_measure_unit fmu
        INNER JOIN measure_unit mu ON mu.measure_unit_id = fmu.food_measure_unit_id
        INNER JOIN food f ON f.food_id = fmu.food_id
        WHERE f.food_id = ? and mu.measure_unit_id = ?;
        """
        food_information = cursor.execute( query, ( food_id, measure_unit_id ) ).fetchone()
        return cls.food_json( *food_information )

    @classmethod
    def get_food_id_by_name( cls, food_name ):
        query  = """
        SELECT food_id 
        FROM food
        WHERE food_name = ?
        """
        food_id = cursor.execute( query, ( food_name, ) ).fetchone()
        if food_id:
            return food_id[0]
        return False

    @classmethod
    def create_food( cls, food_name, creator_id, food_measure_unit_id, food_calories, food_carbohydrates=None, food_fats=None, food_proteins=None ):
        create_food_query="""
        INSERT INTO food VALUES( ?, 1, ? );
        """
        cursor.execute( create_food_query, ( food_name, creator_id ) )

        # get the id of the food created reacently
        food_created_id = cursor.execute( "SELECT @@IDENTITY AS ID" ).fetchone()[0]

        create_food_measure_unit_query = """
        INSERT INTO food_measure_unit VALUES ( ?, ?, ?, ?, ?, ? );

        """
        cursor.execute( create_food_measure_unit_query, ( food_created_id, food_measure_unit_id, food_calories, food_carbohydrates, food_fats, food_proteins ) )

        cursor.commit()
        return int(food_created_id)

    @classmethod
    def update_food( cls, food_id, food_name, creator_id, food_measure_unit_id, food_calories, food_carbohydrates=None, food_fats=None, food_proteins=None ):
        update_food_query="""
        UPDATE food
        SET food_name = ?
        WHERE food_id = ? AND creator_id = ?
        """
        cursor.execute( update_food_query, ( food_name, food_id, creator_id ) )

        update_food_measure_unit_query = """
        UPDATE food_measure_unit
        SET food_calories = ?, food_fats = ?, food_carbohydrates = ?, food_proteins = ?
        WHERE food_id = ?
        """
        cursor.execute(update_food_measure_unit_query, ( food_calories, food_fats, food_carbohydrates, food_proteins, food_id ))
        cursor.commit()
        return "Comida actualizada"

    @classmethod
    def remove_food( cls, profile_id, food_id ):
        remove_created_food_query="""
        UPDATE food
        SET listed_food = 0
        WHERE creator_id=? AND food_id=?
        """
        cursor.execute(remove_created_food_query, ( profile_id, food_id ))
        cursor.commit()
        return "Comida removida"

    @classmethod
    def regist_food( cls, profile_id, day_food_id, food_measure_unit_id, food_id, quantity ):
        query= """
        INSERT INTO food_register 
        (profile_id, day_food_id, food_measure_unit_id, food_id, quantity) 
        VALUES (?, ?, ?, ?, ?);
        """
        cursor.execute( query, ( profile_id, day_food_id, food_measure_unit_id, food_id, quantity ) )

        food_register_id = cursor.execute( "SELECT @@IDENTITY AS ID" ).fetchone()[0]
        cursor.commit()
        
        return int(food_register_id)

    @classmethod
    def delete_food_regist( cls, food_register_id ):
        query="""
        DELETE FROM food_register
        WHERE food_register_id = ?
        """
        cursor.execute( query, ( food_register_id, ) )
        cursor.commit()

        return "Registro eliminado"

    @classmethod
    def food_registers_per_day( cls, profile_id, food_register_day ):
        query="""
        SELECT fr.food_register_id, f.food_name, fr.day_food_id, (fr.quantity * fmu.food_calories) 'Calories'
        FROM food f 
        INNER JOIN food_measure_unit fmu ON fmu.food_id = f.food_id
        INNER JOIN food_register fr ON fr.food_id = f.food_id
        WHERE fr.profile_id = ? AND fr.food_register_day = ? AND fr.food_measure_unit_id = fmu.food_measure_unit_id
        ORDER BY fr.day_food_id ASC;
        """

        rows = cursor.execute( query, ( profile_id, food_register_day ) ).fetchall()
        if len(rows) == 0:
            return []
        registers = [ { 'food_register_id': food_register_id, 'food_name': food_name, 'day_food_id': day_food_id, 'calories': calories } for food_register_id, food_name, day_food_id, calories in rows ]
        return registers

    @classmethod
    def nutrition_summary_per_day( cls, profile_id, food_register_day ):
        query="""
	SELECT ROUND(SUM(fmu.food_calories * fr.quantity),2) 'Calories', ROUND(SUM(fmu.food_carbohydrates * fr.quantity), 2) 'Carbohydrates', ROUND(SUM(fmu.food_fats * fr.quantity),2) 'Fats', ROUND(SUM(fmu.food_proteins * fr.quantity),2) 'Proteins'
	from food_register fr
	INNER JOIN food_measure_unit fmu ON fr.food_id = fmu.food_id
	WHERE fr.profile_id = ? AND fr.food_register_day = ? AND fr.food_measure_unit_id = fmu.food_measure_unit_id;
        """
        row = cursor.execute( query, ( profile_id, food_register_day ) ).fetchone()
        total_calories, total_carbohydrates, total_fats, total_proteins = row
        return {
            'total_calories': total_calories or 0,
            'total_carbohydrates': total_carbohydrates or 0,
            'total_fats': total_fats or 0,
            'total_proteins': total_proteins or 0
        }

    @classmethod
    def weekly_calories( cls, profile_id, input_date ):
        input_year, input_month, input_day = input_date.split('-')

        input_month = input_month if int(input_month) / 10 >= 1 else input_month[1]
        print( input_month )
        input_day = input_day if int(input_day) / 10 >= 1 else input_day[1]
        print( input_day )

        day = date(int(input_year), int(input_month), int(input_day))
        monday = day - timedelta( days = ( day.weekday() ) )
        tuesday = monday + timedelta( days = 1 )
        wednesday = monday + timedelta( days = 2 )
        thursday = monday + timedelta( days = 3 )
        friday = monday + timedelta( days = 4 )
        satuday = monday + timedelta( days = 5 )
        sunday = monday + timedelta( days = 6 )

        week = [ str(monday), str(tuesday), str(wednesday), str(thursday), str(friday), str(satuday), str(sunday) ]

        query = """
        SELECT SUM(fr.quantity * fmu.food_calories), fr.food_register_day
        FROM food_register fr
        INNER JOIN food_measure_unit fmu ON fmu.food_id = fr.food_id
        wHERE profile_id = ? AND fr.food_register_day BETWEEN ? AND ? AND fr.food_measure_unit_id = fmu.food_measure_unit_id
        GROUP BY fr.food_register_day;
        """
        rows = cursor.execute( query, ( profile_id, str(monday), str(sunday) ) ).fetchall()

        weekly_calories = []
        for week_day in week:
            weekly_calories.append({ 'weekday': week_day, 'calories':  getCaloriesOfDay( week_day, rows )})
        return weekly_calories

    @classmethod
    def get_own_foods( cls, profile_id ):
        query = """
        SELECT food_id, food_name
        FROM food 
        WHERE creator_id=? AND listed_food = 1
        ORDER BY food_name DESC
        """
        rows = cursor.execute( query, (profile_id,) ).fetchall()
        foods = [ { 'food_id': food_id, 'food_name': food_name } for food_id, food_name in rows ] 
        return foods

