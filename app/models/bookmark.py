from .db import db

bookmarks = db.Table('bookmarks',
    db.Column('profileId', db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
    db.Column('movieId', db.Integer, db.ForeignKey("movies.id"), primary_key=True)
)
