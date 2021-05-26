from flask import Blueprint, jsonify, session, request
from app.models import Profile, Movie, Like, db

movie_routes = Blueprint('movie', __name__)

@movie_routes.route('/<int:movieId>/likes/<int:profileId>', methods=['POST', 'DELETE'])
def handleLikes(movieId, profileId):
    if request.method == 'DELETE':
        print('cat')
    else:
        upvoteDownvote = response.get_json()
        like = Like(profileId=profileId, movieId=movieId, upvoteDownvote=upvoteDownvote)
        db.session.add(like)
        db.commit()
        return
