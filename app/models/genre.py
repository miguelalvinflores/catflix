from .db import db
from .movieGenre import movieGenres

class Genre(db.Model):
    __tablename__="genres"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    movies = db.relationship("Movie", secondary=movieGenres, back_populates="genres" )
