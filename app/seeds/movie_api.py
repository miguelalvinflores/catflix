import requests
# import json
import random
import os
from app.models import db, Movie, Genre
from app.seeds import movie_url


key = os.environ.get("MOVIE_DB_API_KEY")


def get_movie_data(pagenum):
    res = requests.get(
            f'https://api.themoviedb.org/3/search/movie?api_key={key}&query="cat"&include_adult=false&page={pagenum}'
        )
    movies = res.json()
    for movie in movies["results"]:
        rand_url = movie_url.movie_list[random.randint(0, 14)]
        if movie["poster_path"] and movie["overview"] and movie["genre_ids"] and movie['backdrop_path']:
            movie_seed = Movie(
                title=movie["original_title"],
                image="https://image.tmdb.org/t/p/original/"+movie["poster_path"],
                description=movie["overview"],
                url=rand_url,
                backdrop='https://www.themoviedb.org/t/p/original'+movie['backdrop_path']
                )
            for genre_id in movie["genre_ids"]:
                genre = Genre.query.filter_by(mdb_id=genre_id).first()
                movie_seed.genres.append(genre)
            # grab list genreObj thru filter query of genre['name']
            # append each genreObj to movie.genres
            db.session.add(movie_seed)


def get_movie_genres():
    res = requests.get(
            f'https://api.themoviedb.org/3/genre/movie/list?api_key={key}'
        )
    genres = res.json()
    for genre in genres['genres']:
        genre_seed = Genre(
            type=genre['name'],
            mdb_id=genre["id"]
        )
        db.session.add(genre_seed)

# def test():
#     res = requests.get(
#       f'https://api.themoviedb.org/3/search/movie?api_key={key}&query="cat"&include_adult=false'
# )
#     genres = res.json()
#     print(genres)
# test()
