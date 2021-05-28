from .db import db

# likes = db.Table('likes',
#     db.Column('profileId', db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
#     db.Column('movieId', db.Integer, db.ForeignKey("movies.id"), primary_key=True)
# )


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(db.Integer, db.ForeignKey('profiles.id'))
    movieId = db.Column(db.Integer, db.ForeignKey('movies.id'))
    upvoteDownvote = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return{
            "id": self.id,
            "profileId": self.profileId,
            "movieId": self.movieId,
            "upvoteDownvote": self.upvoteDownvote
        }
