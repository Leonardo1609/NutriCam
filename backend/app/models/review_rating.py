from ..db import cursor

class ReviewRating :
    @classmethod
    def review_rating_to_json( cls, review_rating_id, rating, review, review_rating_updated_date, user_name, user_email ):
        return {
            "review_rating_id": review_rating_id,
            "rating": rating,
            "review": review,
            "review_rating_updated_date": str( review_rating_updated_date ),
            "user_name": user_name,
            "user_email": user_email
        }

    @classmethod
    def get_review_and_rating(cls, profile_id):
        query="""
        SELECT review_rating_id, rating, review
        FROM review_rating
        WHERE profile_id=?
        """
        row = cursor.execute( query, ( profile_id, ) ).fetchone()
        if not row:
            return None

        review_rating = { 
            'review_rating_id': row[0],
            'rating': row[1],
            'review': row[2]
        }
        return review_rating

    @classmethod
    def post_review_and_rating( cls, review_rating_date, profile_id, rating, review = None ):
        query="""
        INSERT INTO review_rating
        (rating, review, profile_id, review_rating_updated_date)
        VALUES (?, ?, ?, ?)
        """
        cursor.execute( query, ( rating, review, profile_id, review_rating_date ) )
        review_rating_id = cursor.execute( 'SELECT @@IDENTITY AS ID' ).fetchone()[0]
        cursor.commit()
        return review_rating_id

    @classmethod
    def modify_review_and_rating( cls, review_rating_date, profile_id, rating, review = None ):
        query="""
        UPDATE review_rating
        SET rating = ?, review = ?, review_rating_updated_date = ?
        WHERE profile_id = ?
        """
        cursor.execute( query, ( rating, review, review_rating_date, profile_id ) )
        cursor.commit()
        return "Calificación y Reseña Actualizada"

    @classmethod
    def delete_review_and_rating( cls, profile_id ):
        query="""
        DELETE FROM review_rating
        WHERE profile_id = ? 
        """
        cursor.execute( query, ( profile_id, ) )
        cursor.commit()
        return "Calificación y reseña eliminada"

    @classmethod
    def quantity_reviews_ratings_per_rating(cls, initial_date = None, last_date = None):
        rows = []
        if not initial_date and not last_date:
            query = """
            SELECT COUNT(*), rating
            FROM review_rating
            WHERE review_rating_updated_date BETWEEN (
                SELECT TOP 1 review_rating_updated_date 
	        FROM review_rating 
	        ORDER BY review_rating_updated_date ASC
            ) AND GETDATE()
            GROUP BY rating;
            """
            rows = cursor.execute( query ).fetchall()
        elif initial_date and last_date: 
            query="""
            SELECT COUNT(*), rating
            FROM review_rating
            WHERE review_rating_updated_date BETWEEN ? AND ? 
            GROUP BY rating;
            """
            rows = cursor.execute( query, ( initial_date, last_date ) ).fetchall()

        review_ratings_per_rating = [ { "rating": rating, "quantity": quantity } for quantity, rating in rows ]
        return review_ratings_per_rating

    @classmethod
    def reviews_per_rating( cls, rating = None, initial_date = None, last_date = None ):
        rows = []
        if not rating and not initial_date and not last_date:
            query = """
            SELECT rr.review_rating_id, rr.rating, rr.review, rr.review_rating_updated_date, u.user_name, u.user_email
            FROM review_rating rr
            INNER JOIN profile p ON rr.profile_id = p.profile_id
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE rr.review_rating_updated_date BETWEEN (
	        SELECT TOP 1 review_rating_updated_date 
	        FROM review_rating 
	        ORDER BY review_rating_updated_date ASC
            ) AND GETDATE();
            """
            rows = cursor.execute( query ).fetchall()
        elif rating and not initial_date and not last_date:
            query = """
            SELECT rr.review_rating_id, rr.rating, rr.review, rr.review_rating_updated_date, u.user_name, u.user_email
            FROM review_rating rr
            INNER JOIN profile p ON rr.profile_id = p.profile_id
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE rr.review_rating_updated_date BETWEEN (
            	SELECT TOP 1 review_rating_updated_date 
            	FROM review_rating 
            	ORDER BY review_rating_updated_date ASC
            ) AND GETDATE() AND rr.rating = ?;
            """
            rows = cursor.execute( query, ( rating, ) ).fetchall()
        elif not rating and initial_date and last_date:
            query = """
            SELECT rr.review_rating_id, rr.rating, rr.review, rr.review_rating_updated_date, u.user_name, u.user_email
            FROM review_rating rr
            INNER JOIN profile p ON rr.profile_id = p.profile_id
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE rr.review_rating_updated_date BETWEEN ? AND ?;
            """
            rows = cursor.execute( query, ( initial_date, last_date ) ).fetchall()
        elif rating and initial_date and last_date:
            query="""
            SELECT rr.review_rating_id, rr.rating, rr.review, rr.review_rating_updated_date, u.user_name, u.user_email
            FROM review_rating rr
            INNER JOIN profile p ON rr.profile_id = p.profile_id
            INNER JOIN users u ON u.user_id = p.user_id
            WHERE rr.review_rating_updated_date BETWEEN ? AND ? AND rr.rating = ?;
            """
            rows = cursor.execute( query, ( initial_date, last_date, rating ) ).fetchall()
        reviews_ratings = [ cls.review_rating_to_json( *row ) for row in rows ]
        return reviews_ratings

    @classmethod
    def first_review_date( cls ):
        query = """
   	SELECT TOP 1 review_rating_updated_date 
        FROM review_rating 
        ORDER BY review_rating_updated_date ASC
        """
        date = cursor.execute( query ).fetchone()
        if date:
            return date[0]
        return None
