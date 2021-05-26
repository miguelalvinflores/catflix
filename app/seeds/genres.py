import requests
import json
import random
import os
from app.models import db, Movie , Genre, movieGenres
from app.seeds import movie_url

key= os.environ.get("MOVIE_DB_API_KEY")
