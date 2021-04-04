from ..db import cursor

class ReviewRating :
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
    def post_review_and_rating( cls, profile_id, rating, review = None ):
        query="""
        INSERT INTO review_rating
        (rating, review, profile_id)
        VALUES (?, ?, ?)
        """
        cursor.execute( query, ( rating, review, profile_id ) )
        review_rating_id = cursor.execute( 'SELECT @@IDENTITY AS ID' ).fetchone()[0]
        cursor.commit()
        return review_rating_id

    @classmethod
    def modify_review_and_rating( cls, profile_id, rating, review = None ):
        query="""
        UPDATE review_rating
        SET rating = ?, review = ?
        WHERE profile_id = ?
        """
        cursor.execute( query, ( rating, review, profile_id ) )
        cursor.commit()
        return "Puntuación y Reseña Actualizada"

    @classmethod
    def delete_review_and_rating( cls, profile_id ):
        query="""
        DELETE FROM review_rating
        WHERE profile_id = ? 
        """
        cursor.execute( query, ( profile_id, ) )
        cursor.commit()
        return "Puntuación y reseña eliminada"

