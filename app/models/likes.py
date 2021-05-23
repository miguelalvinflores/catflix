from .db import db

likes = db.Table('likes',
    db.Column('profileId', db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
    db.Column('movieId', db.Integer, db.ForeignKey("movies.id"), primary_key=True)
)
