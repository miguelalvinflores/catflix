from flask import Blueprint, request
from app.models import Movie, Genre, Profile, db, Like
import random

movie_routes = Blueprint('movie', __name__)


@movie_routes.route(
    '/<int:movieId>/likes/<int:profileId>', methods=['DELETE', 'POST', 'PATCH']
)
def handleLikes(movieId, profileId):
    if request.method == 'DELETE':
        like = Like.query.filter(
            Like.profileId == profileId, Like.movieId == movieId).first()
        db.session.delete(like)
    elif request.method == 'POST':
        data = request.get_json()
        like = Like(
            profileId=profileId,
            movieId=movieId,
            upvoteDownvote=data["upvoteDownvote"]
        )
        db.session.add(like)
    else:
        data = request.get_json()
        like = Like.query.filter(
            Like.profileId == profileId,
            Like.movieId == movieId).first()
        like.upvoteDownvote = data["upvoteDownvote"]
    db.session.commit()
    return {"success": "success"}


@movie_routes.route('/allMovies')
def get_allMovies():
    movies = Movie.query.all()
    movielist = {'movies': [movie.to_dict() for movie in movies]}
    return movielist


@movie_routes.route('/movie')
def get_movie():
    movie = Movie.query.filter(Movie.id == random.randint(1, 81)).first()
    return movie.to_dict()


@movie_routes.route('/genre/<int:genreId>')
def get_movies_by_genreId(genreId):
    genre = Genre.query.filter(Genre.id == genreId).first()
    movies = Movie.query.join(Movie.genres).filter(
        Genre.type == genre.type).limit(15)
    genremovie = {genre.type: [movie.to_dict() for movie in movies]}
    return genremovie


# @movie_routes.route('random')
# def get_random_movie():
#     movies = Movie.query.gi

@movie_routes.route('/search', methods=['POST'])
def search_movies():
    data = request.json
    term = data['searchTerm']

    genre = Genre.query.filter(Genre.type == term.title()).first()
    if genre:
        movies = Movie.query.join(Movie.genres).filter(
            (Genre.type == genre.type) |
            Movie.title.ilike(f'%{term}%') |
            Movie.description.ilike(f'%{term}%')
        ).all()
    else:
        movies = Movie.query.filter(
            Movie.title.ilike(f'%{term}%') |
            Movie.description.ilike(f'%{term}%')).all()

    matches = {'matches': [movie.to_dict() for movie in movies]}
    return matches

    # pro-move: check again if movie is in profile.bookmarks
    # and store in variable use as
    # conditional to double check before performing CRUD


@movie_routes.route(
    '/<int:movieId>/bookmarks/<int:profileId>', methods=['POST', 'DELETE']
)
def handle_bookmark(movieId, profileId):
    profile = Profile.query.get(profileId)
    movie = Movie.query.get(movieId)
    if request.method == 'POST':
        profile.bookmarks.append(movie)
    else:
        profile.bookmarks.remove(movie)
    db.session.commit()
    return {"success": "success"}


@movie_routes.route('/<int:movieId>')
def get_movie_by_id(movieId):
    movie = Movie.query.get(movieId)
    return movie.to_dict()
