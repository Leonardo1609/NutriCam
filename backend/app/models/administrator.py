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
            if len(rows) > 1:
                return {'users_with_caloric_plan': rows[0][0], 'users_without_caloric_plan': rows[1][0]}
            return {'users_with_caloric_plan': rows[0][0], 'users_without_caloric_plan': rows[0][0]} 

    @classmethod
    def get_quantity_users_improvement(cls):
        users_mantained_query = """
        SELECT COUNT(*)
        FROM profile p
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE p.profile_previous_imc IS NULL OR p.profile_current_imc = p.profile_previous_imc OR 
        ( p.profile_previous_imc >= 18.5 AND p.profile_previous_imc <= 24.9 AND p.profile_current_imc >= 18.5 AND p.profile_current_imc <=24.9);
        """ 
        quantity_users_mantained = cursor.execute( users_mantained_query ).fetchone()[0]

        users_improvement_query = """
        SELECT COUNT(*)
        FROM profile p
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE ((p.w_level_id = 1) AND (p.profile_previous_imc < p.profile_current_imc))
        OR ((p.w_level_id = 2) AND (p.profile_previous_imc < 18.5 AND p.profile_current_imc <= 24.9))
        OR ((p.w_level_id = 2) AND (p.profile_previous_imc > 24.9 AND p.profile_current_imc >= 18.5))
        OR ((p.w_level_id >= 3) AND (p.profile_previous_imc > p.profile_current_imc AND p.profile_current_imc >= 18.5));
        """
        quantity_users_improvement = cursor.execute( users_improvement_query ).fetchone()[0]

        users_worsen_query = """
        SELECT COUNT(*)
        FROM profile p
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE ((p.w_level_id = 1) AND ((p.profile_previous_imc > p.profile_current_imc) OR (p.profile_previous_imc >= 18.5)))
        OR ((p.w_level_id >= 3) AND ((p.profile_previous_imc < p.profile_current_imc) OR (p.profile_previous_imc <= 24.9)));
        """
        quantity_users_worsen = cursor.execute( users_worsen_query ).fetchone()[0]

        return {
            "quantity_users_mantained": quantity_users_mantained,
            "quantity_users_improvement": quantity_users_improvement,
            "quantity_users_worsen": quantity_users_worsen
        }
    
    @classmethod
    def format_users_improvement( cls, rows ):
        print(rows)
        return [ {  'user_id': user_id, 'user_name': user_name, 'w_level_name': w_level_name, 'profile_previous_imc': float(profile_previous_imc), 'profile_current_imc': float(profile_current_imc) } for user_id, user_name, w_level_name, profile_previous_imc, profile_current_imc in rows ]

    @classmethod
    def get_users_improvement( cls, case = None ):
        all_users_query = """
        SELECT u.user_id, u.user_name, wl.w_level_name, p.profile_previous_imc, p.profile_current_imc
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id;
        """

        users_mantained_query = """
        SELECT u.user_id, u.user_name, wl.w_level_name, p.profile_previous_imc, p.profile_current_imc
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE p.profile_previous_imc IS NULL OR p.profile_current_imc = p.profile_previous_imc OR 
        ( p.profile_previous_imc >= 18.5 AND p.profile_previous_imc <= 24.9 AND p.profile_current_imc >= 18.5 AND p.profile_current_imc <=24.9 );
        """

        users_improvement_query = """
        SELECT u.user_id, u.user_name, wl.w_level_name, p.profile_previous_imc, p.profile_current_imc
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE ((p.w_level_id = 1) AND (p.profile_previous_imc < p.profile_current_imc))
        OR ((p.w_level_id = 2) AND (p.profile_previous_imc < 18.5 AND p.profile_current_imc <= 24.9))
        OR ((p.w_level_id = 2) AND (p.profile_previous_imc > 24.9 AND p.profile_current_imc >= 18.5))
        OR ((p.w_level_id >= 3) AND (p.profile_previous_imc > p.profile_current_imc AND p.profile_current_imc >= 18.5));
        """

        users_worsen_query = """
        SELECT u.user_id, u.user_name, wl.w_level_name, p.profile_previous_imc, p.profile_current_imc
        FROM profile p
        INNER JOIN users u ON u.user_id = p.user_id
        INNER JOIN weight_level wl ON p.w_level_id = wl.w_level_id
        WHERE ((p.w_level_id = 1) AND ((p.profile_previous_imc > p.profile_current_imc) OR (p.profile_previous_imc >= 18.5)))
        OR ((p.w_level_id >= 3) AND ((p.profile_previous_imc < p.profile_current_imc) OR (p.profile_previous_imc <= 24.9)));
        """

        if not case:
            rows = cursor.execute( all_users_query ).fetchall()
            return cls.format_users_improvement( rows )
        if case == 'improvement':
            rows = cursor.execute( users_improvement_query ).fetchall()
            return cls.format_users_improvement( rows )
        if case == 'worsen':
            rows = cursor.execute( users_worsen_query ).fetchall()
            return cls.format_users_improvement( rows )
        if case == 'mantained':
            rows = cursor.execute( users_mantained_query ).fetchall()
            return cls.format_users_improvement( rows )
