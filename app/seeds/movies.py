from app.models import db
from app.seeds.movie_api import get_movie_data


# Adds a movie, you can add other movies here if you want
def seed_movies():

    for x in range(1, 50):
        get_movie_data(x)

    # db.session.add(movie1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_movies():
    db.session.execute('TRUNCATE movies RESTART IDENTITY CASCADE;')
    db.session.commit()
