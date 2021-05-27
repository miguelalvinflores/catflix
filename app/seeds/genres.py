import requests
import json
import random
import os
from app.models import db, Movie, Genre, movieGenres
from app.seeds import movie_url
from app.seeds.movie_api import get_movie_genres


# Adds a movie, you can add other movies here if you want
def seed_genres():

    get_movie_genres()

    # db.session.add(movie1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()
