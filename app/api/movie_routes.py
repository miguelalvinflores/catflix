from flask import Blueprint
from app.models import Movie

movie_routes = Blueprint('movie', __name__)


# @movie_routes.route('/<int:movieId>/likes/<int:profileId>', methods=['POST', 'DELETE'])
# def handleLikes(movieId, profileId):
#     if request.method == 'DELETE':
#         print('cat')
#     else:
#         upvoteDownvote = response.get_json()
#         like = Like(profileId=profileId, movieId=movieId, upvoteDownvote=upvoteDownvote)
#         db.session.add(like)
#         db.commit()
#         return
@movie_routes.route('/')
def get_movies():
    movies = Movie.query.all()
    return {'movies': [movie.to_dict() for movie in movies]}
