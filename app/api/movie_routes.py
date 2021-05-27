from flask import Blueprint
from app.models import Movie, Genre

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
    print('in api/movies/genre/id')
    print("="*10)
    genre = Genre.query.filter(Genre.id == genreId)
    # movies = Movie.query.join(Movie.genres).filter(Genre.type == genre.type)
    # movies = Movie.query.filter(Movie.genres.id == genre.id)
    print("GENRE glkjdfoghdjgoi", genre)
    movies = Movie.query.filter(Movie.genres.any(genreId == genre.id)).all()
    print(movies, 'in api/movies/genre/id after querying')

    genremovie = {'genres': [movie.to_dict() for movie in movies]}
    print(genremovie)
    return genremovie
