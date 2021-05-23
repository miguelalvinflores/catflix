from .db import db

class Membership(db.Model):
    __tablename__ = "memberships"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False, unique = True)

    users = db.relationship("User", backref="membership", lazy=True)
