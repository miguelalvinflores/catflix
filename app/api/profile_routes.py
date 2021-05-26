from flask import Blueprint, jsonify, session, request
from app.models import Profile, db, User

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/', methods=['POST'])
def get_user_profiles():
    data = request.json
    profiles = Profile.query.filter(Profile.userId == data['userId']).first()
    # return {"profiles": [profile.__dict__ for profile in profiles]}
    print(dir(profiles))


@profile_routes.route('/<int:id>')
def get_Profile(id):
    # joins query and grab that profiles likes + bookmarks
    profile = Profile.query.filter()
    print(profile, '==== profile ====')
    # return some dictionary object of profile
    # add a to_dict instance method after everything works
    # return {
    #     "id": profile.id,
    #     "name":profile.name
    #     "iconId": profile.iconId
    #     "likes": profile.likes,
    #     "bookmarks": profile.movies
    # }
