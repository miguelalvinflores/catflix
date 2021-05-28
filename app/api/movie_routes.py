from flask import Blueprint
from app.models import Movie, Genre
# import random

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

    movielist = {'movies': [movie.to_dict() for movie in movies]}

    return movielist


@movie_routes.route('/genre/<int:genreId>')
def get_movies_by_genreId(genreId):
    genre = Genre.query.filter(Genre.id == genreId).first()
    movies = Movie.query.join(Movie.genres).filter(Genre.type == genre.type)
    genremovie = {genre.type: [movie.to_dict() for movie in movies]}
    return genremovie


# @movie_routes.route('random')
# def get_random_movie():
#     movies = Movie.query.gi
