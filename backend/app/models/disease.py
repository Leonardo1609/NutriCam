from ..db import cursor
class Disease:
    @classmethod
    def get_diseases_by_w_level_id( cls, w_level_id ):
        query = """
        SELECT d.disease_id, d.disease_name
        FROM weight_level_disease wls
        INNER JOIN weight_level wl ON wl.w_level_id = wls.w_level_id
        INNER JOIN disease d ON d.disease_id = wls.disease_id
        where wl.w_level_id = ?;
        """
        rows = cursor.execute( query, ( w_level_id, ) ).fetchall()
        diseases = [{ 'disease_id': disease[0], 'disease_name': disease[1] } for disease in rows ]
        return diseases
