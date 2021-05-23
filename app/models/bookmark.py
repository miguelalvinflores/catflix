from .db import db

# class Bookmark(db.Model):
#     __tablename__ = "bookmarks"


#     id = db.Column(db.Integer, primary_key=True)
#     profileId = db.Column(db.Integer, db.ForeignKey('profiles.id'))
#     movieId = db.Column(db.Integer, db.ForeignKey('movies.id'))
bookmarks = db.Table('bookmarks',
    db.Column('profileId', db.Integer, db.ForeignKey("profiles.id"), primary_key=True),
    db.Column('movieId', db.Integer, db.ForeignKey("movies.id"), primary_key=True)
)
