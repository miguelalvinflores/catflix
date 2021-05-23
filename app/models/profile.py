from .db import db

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key = True)
    iconId = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable = False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    bookmarks = db.relationship("Bookmark", backref="profile", lazy="joined")
