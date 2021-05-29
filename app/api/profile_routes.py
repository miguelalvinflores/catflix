from flask import Blueprint, jsonify, session, request
from app.models import Profile, db, Icon
profile_routes = Blueprint('profile', __name__)


@profile_routes.route('/', methods=['POST'])
def get_user_profiles():
    data = request.json
    profiles = db.session.query(Profile, Icon).join(Icon).filter(Profile.userId == data['userId']).all()
    print("JOINS", profiles)
    profiles_lst = []
    for profile in profiles:
        likes = {}
        bookmarks = {}
        for like in profile[0].likes:
            likes[like.movieId]=like.upvoteDownvote
        for movie in profile[0].bookmarks:
            bookmarks[movie.id] = movie.id
        profiles_lst.append(({
            "id": profile[0].id,
            "name": profile[0].name,
            "iconId": profile[0].iconId,
            "userId": profile[0].userId,
            "likes" : likes,
            "bookmarks" : bookmarks
        }, {
            "id": profile[1].id,
            "image_url": profile[1].image_url
        }))
    res = {"profiles": profiles_lst}

    return res


# @profile_routes.route('/<int:id>')
# def get_Profile(id):
#     # joins query and grab that profiles likes + bookmarks
#     profile = Profile.query.filter()
#     print(profile, '==== profile ====')
#     # return some dictionary object of profile
#     # add a to_dict instance method after everything works
#     # return {
#     #     "id": profile.id,
#     #     "name":profile.name
#     #     "iconId": profile.iconId
#     #     "likes": profile.likes,
#     #     "bookmarks": profile.movies
#     # }
