import requests
import json
import random
import os
from app.models import db, Movie , Genre, movieGenres
from app.seeds import movie_url

key= os.environ.get("MOVIE_DB_API_KEY")

def get_movie_data():
    res = requests.get(f'https://api.themoviedb.org/3/search/movie?api_key={key}&query="cat"&include_adult=false')
    movies = res.json()
    for movie in movies["results"]:
        rand_url = movie_url[random.randInt(0,14)]
        if movie["poster_path"] and movie["overview"]:
            movie_seed = Movie(
                title=movie["original_title"],
                image="https://image.tmdb.org/t/p/original/"+movie["poster_path"],
                description=movie["overview"],
                url=rand_url
                )

        db.session.add(movie_seed)

def get_movie_genres():
    res = requests.get(f'https://api.themoviedb.org/3/genre/movie/list?api_key={key}')
    genres = res.json()

test()
