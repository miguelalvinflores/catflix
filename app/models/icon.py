from .db import db

class Icon(db.Model):
    __tablename__ = "icons"

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String, nullable=False)

    profiles = db.relationship("Profile", backref="icons", lazy=False)
