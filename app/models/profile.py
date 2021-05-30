from .db import db
from .bookmark import bookmarks

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable=False)
    iconId = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable = False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    # bookmarks = db.relationship("Bookmark", backref="profile", lazy="joined")
    bookmarks = db.relationship("Movie", secondary=bookmarks, back_populates="profiles", lazy='dynamic')
    # likes = db.relationship("Movie", secondary=likes, back_populates="profile_likes")
    likes = db.relationship("Like", backref="profile_movies", lazy="joined")
