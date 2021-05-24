from .db import db

class Movie(db.model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String, nullalbe=False)
    description = db.Column(db.Text, nullable=False)
    cast = db.Column(db.String, nullable=False)
    url = db.Column(db.String)

    # bookmarks = db.relationship("Profile", secondary=bookmarks, lazy="subquery",
    #     backref=db.backref('movies', lazy=True)
    # )

    profiles = db.relationship("Profile", secondary=bookmarks, back_populates="movies")
    genres = db.relationship("Genre", secondary=movieGenres, back_populates="movies" )
    # relationship names must be unique? or reusable?
    # likes = db.relationship("Likes", back_populates="movies")
    likes = db.relationship("Likes", backref="movies", lazy="joined")
