from .db import db

class Movie(db.model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String, nullalbe=False)
    description = db.Column(db.Text, nullable=False)
    cast = db.Column(db.String, nullable=False)
