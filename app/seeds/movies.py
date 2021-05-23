from app.models import db, Movie

# Adds a movie, you can add other movies here if you want
def seed_movies():

    movie1 = Movie(
        title='', 
        image='',
        description='',
        cast='',
        url=''
        )

    db.session.add(movie1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_movies():
    db.session.execute('TRUNCATE movies RESTART IDENTITY CASCADE;')
    db.session.commit()