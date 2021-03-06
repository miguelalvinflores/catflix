from .db import db
from .bookmark import bookmarks
from .movieGenre import movieGenres


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    # cast = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    backdrop = db.Column(db.String, nullable=False)

    # bookmarks = db.relationship(
    #     "Profile", secondary=bookmarks, lazy="subquery",
    #     backref=db.backref('movies', lazy=True)
    # )

    profiles = db.relationship(
        "Profile", secondary=bookmarks, back_populates="bookmarks"
    )
    genres = db.relationship(
        "Genre", secondary=movieGenres, back_populates="movies"
    )
    likes = db.relationship("Like", backref="movie_likes", lazy="joined")

    def to_dict(self):
        num_upvote = 0
        for like in self.likes:
            if like.upvoteDownvote:
                num_upvote += 1

        return{
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            "url": self.url,
            "backdrop": self.backdrop,
            "num_upvote": num_upvote,
            "total_votes": len(self.likes)
        }
