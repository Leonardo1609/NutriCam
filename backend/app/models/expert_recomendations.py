from ..db import cursor

class ExpertRecommendation: 
    @classmethod
    def get_recommendation( cls ):
        query = """
        SELECT TOP 1 message 
        FROM expert_recommendation  
        ORDER BY NEWID()  
        """
        row = cursor.execute( query ).fetchone()
        return row[0]
