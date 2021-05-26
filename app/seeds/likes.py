import random
from app.models import db, Like

# Adds a movie, you can add other movies here if you want


def like_chance():
    chance = random.randint(1, 100)
    if chance > 60:
        return True
    elif chance > 50:
        return False
    return None


def seed_likes():

    for profile_id in range(1, 30):
        for movie_id in range(1, 80):
            like_res = like_chance()
            if like_res is None:
                continue
            else:
                like = Like(
                    profileId=profile_id,
                    movieId=movie_id,
                    upvoteDownvote=like_res
                )
                db.session.add(like)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
