from flask import Blueprint, jsonify, session, request
from app.models import Profile, db

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/<int:id>')
def get_Profile(id):
    # joins query and grab that profiles likes + bookmarks?
    profile = Profile.query.get(id)
    print(profile, '==== profile ====')
    # return some dictionary object of profile
    # return {
    #     "id": profile.id,
    #     "name":profile.name
    #     "iconId": profile.iconId
    #     "likes": profile.likes,
    #     "bookmarks": profile.movies
    # }
