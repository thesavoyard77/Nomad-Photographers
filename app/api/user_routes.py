from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.photo import Photo

user_routes = Blueprint('users', __name__)



@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Get one user's photos
@user_routes.route('/<int:id>/photos')
@login_required
def users_photos(id):
    photos = Photo.query.filter_by(user_id = id).all()
    return {photo.id:photo.to_dict() for photo in photos}