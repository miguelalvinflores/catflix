from .db import db

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key = True)
    iconId = db.Column(db.Integer, db.ForeignKey("icon.id"), nullable = False)
    userId = db.Column(db.Integer, db.ForeignKey("user.id"), nullable = False)
