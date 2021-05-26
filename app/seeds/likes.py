import random
from app.models import db, Likes

# Adds a movie, you can add other movies here if you want
def like_chance():
    chance = random.randint(1,100)
    if chance > 60:
        return True
    elif chance > 50:
        return False
    return None

def seed_likes():

    for profile_id in range(1,30):
        for movie_id in range(1,80):
            like_chance = like_chance()
            if like_chance == None:
                continue
            else:
                like = Likes(
                    profileId=profile_id,
                    movieId = movie_id,
                    upvoteDownvote = like_chance
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
