from ..db import cursor

class WeightLevel:
    @classmethod
    def get_weight_level_by_imc( cls, imc ):
        query = """
        SELECT w_level_id, w_level_name 
        FROM weight_level 
        WHERE (w_level_min <= ? AND w_level_max >= ?) OR (w_level_min <= ? AND w_level_max is NULL)
        """
        row = cursor.execute( query, ( imc, imc, imc ) )
        weight_level = row.fetchone()
        return weight_level
    @classmethod
    def get_weight_level_name_by_id( cls, w_level_id ):
        if w_level_id:
            query = 'SELECT w_level_name FROM weight_level WHERE w_level_id = ?'
            row = cursor.execute( query, ( w_level_id, ) )
            weight_level = row.fetchone()
            return weight_level[0]
        return None


