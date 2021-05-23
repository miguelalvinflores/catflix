from .db import db

movieGenre = db.Table('MovieGenres',
    db.Column('genreId', db.Integer, db.ForeignKey("genres.id"), primary_key=True),
    db.Column('movieId', db.Integer, db.ForeignKey("movies.id"), primary_key=True)
)
