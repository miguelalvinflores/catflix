from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Profile, db, Icon
from app.forms import ProfileForm
from .auth_routes import validation_errors_to_error_messages

profile_routes = Blueprint('profile', __name__)


@profile_routes.route('/', methods=['POST'])
def get_user_profiles():
    data = request.json
    profiles = db.session.query(Profile, Icon).join(Icon).filter(Profile.userId == data['userId']).order_by(Profile.id.asc()).all()
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


@profile_routes.route('/icons')
def get_available_icons():
    icons = db.session.query(Icon).all()
    icons_list = { "allIcons": [icon.to_dict() for icon in icons]}
    return icons_list


@profile_routes.route('/create', methods=['POST'])
@login_required
def create_profile():
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.is_authenticated and form.validate_on_submit() and (current_user.id == form.data['userId']):
        profile = Profile(
            name = form.data['name'],
            iconId = form.data['iconId'],
            userId = form.data['userId']
        )
        db.session.add(profile)
        db.session.commit()
        return profile.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@profile_routes.route('/<int:profileId>/edit', methods=['PUT'])
@login_required
def edit_profile(profileId):
    target = request.json['profileId']
    profile = db.session.query(Profile).get(target)
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.is_authenticated and form.validate_on_submit() and (current_user.id == form.data['userId']) and (profileId == target) and (profile.userId == current_user.id):
        profile.name = form.data['name']
        profile.iconId = form.data['iconId']
        db.session.commit()
        return profile.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@profile_routes.route('/<int:profileId>/delete', methods=['DELETE'])
@login_required
def delete_profile(profileId):
    target = request.json['profileId']
    userId = request.json['userId']
    profile = db.session.query(Profile).get(target)
    if current_user.is_authenticated and (current_user.id == userId) and (profileId == target) and (profile.userId == current_user.id):
        db.session.delete(profile)
        db.session.commit()
        return { "message": 'The Profile has been deleted.' }
    return {'errors': 'There was an error in validating the delete request.'}, 401 