from ..db import cursor

class Administration:
    @classmethod
    def is_administrator(cls, user_id):
        query = """
        SELECT role_id
        FROM users
        WHERE user_id = ? 
        """
        role_id = cursor.execute( query, ( user_id, ) ).fetchone()[0]

        if role_id == 1:
            return True
        return False

    @classmethod
    def first_user_created_at_date( cls ):
        query = """
        SELECT TOP 1 profile_initial_date_caloric_plan
        FROM profile
        WHERE profile_have_caloric_plan = 1
        ORDER BY profile_initial_date_caloric_plan ASC;
        """

        date = cursor.execute( query ).fetchone()[0]
        return date

    @classmethod
    def users_quantity_with_and_without_caloric_plan( cls, initial_date = None, last_date = None ):
        first_user_date_query = """
        SELECT TOP 1 profile_initial_date_caloric_plan
        FROM profile
        WHERE profile_have_caloric_plan = 1
        ORDER BY profile_initial_date_caloric_plan ASC;
        """

        first_user_date = cursor.execute( first_user_date_query ).fetchone()[0]

        query_without_dates = """
        SELECT COUNT(*) 
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id 
        WHERE profile_have_caloric_plan = 1 AND u.created_at BETWEEN ? AND GETDATE() 
        UNION
        SELECT COUNT(*) 
        from profile p
        INNER JOIN users u ON u.user_id = p.user_id 
        WHERE profile_have_caloric_plan = 0 AND u.created_at BETWEEN ? AND GETDATE();
        """

        query_with_dates = """
        SELECT COUNT(*) 
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id 
        WHERE profile_have_caloric_plan = 1 AND u.created_at BETWEEN ? AND ?
        UNION
        SELECT COUNT(*) 
        from profile p
        INNER JOIN users u ON u.user_id = p.user_id 
        WHERE profile_have_caloric_plan = 0 AND u.created_at BETWEEN ? AND ?; 
        """
        if not initial_date and not last_date:
            rows = cursor.execute(query_without_dates, ( first_user_date, first_user_date)).fetchall()
            if len(rows) > 1:
                return {'users_with_caloric_plan': rows[0][0], 'users_without_caloric_plan': rows[1][0]}
            return {'users_with_caloric_plan': rows[0][0], 'users_without_caloric_plan': rows[0][0]}
        else:
            rows = cursor.execute(query_with_dates, ( initial_date, last_date, initial_date, last_date )).fetchall()
            return {'users_with_caloric_plan': rows[0][0], 'users_without_caloric_plan': rows[1][0]} 
