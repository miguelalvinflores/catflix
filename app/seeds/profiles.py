from werkzeug.security import generate_password_hash
from app.models import db, Profile, Movie
from faker import Faker
import random

# Adds a demo user, you can add other users here if you want
fake = Faker()
Faker.seed(0)


def seed_profiles():

    demo = Profile(name='demo',
        iconId=2,
        userId=1
    )
    #COMMENT
    # for movie_PK in range(1,10):
    #     movie = Movie.query.get(movie_PK)
    #     demo.bookmarks.append(movie)

    db.session.add(demo)

    for userId in list(range(1,11)):
        for n in range(3):
            profile = Profile(name=fake.name(),
                iconId=random.randint(1, 10),
                userId=userId)
            db.session.add(profile)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()
