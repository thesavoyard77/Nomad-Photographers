from flask import Blueprint, request
import os
from flask_login import login_required, current_user
from app.models import Photo, db
from app.forms.photo_form import AddPhotoForm
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photo_routes = Blueprint('photos', __name__, url_prefix='')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@photo_routes.route('/key')
def key():
        REACT_APP_MAPS_KEY=os.environ.get("REACT_APP_MAPS_KEY")
        print(REACT_APP_MAPS_KEY, "<=========================================")
        return f"{REACT_APP_MAPS_KEY}"

@photo_routes.route('')
def photos():
        photos = Photo.query.all()
        return {photo.id:photo.to_dict() for photo in photos}

@photo_routes.route('/<int:id>')
@login_required
def user_photos(id):
    user_id = current_user.id
    photos = Photo.query.filter(Photo.user_id == user_id).all()
    return {photo.id:photo.to_dict() for photo in photos}





@photo_routes.route("", methods=["POST"])
@login_required
def upload_photo():
    if "photo" not in request.files:
        return {"errors": "photo required"}, 400

    photo = request.files["photo"]

    if not allowed_file(photo.filename):
        return {"errors": "file type not permitted"}, 400
    
    photo.filename = get_unique_filename(photo.filename)

    upload = upload_file_to_s3(photo)
    if "url" not in upload:
        return upload, 400

    url = upload["url"]
    description = request.form['description']
    geo_location = request.form['geo_location']
    place_name = request.form['place_name']

    new_photo = Photo(
        url=url,
        description=description,
        user_id = current_user.id,
        geo_location=geo_location,
        place_name=place_name
         
         )
    db.session.add(new_photo)
    db.session.commit()
    return new_photo.to_dict()


@photo_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_photo(id):
    form = AddPhotoForm()
    form["csrf_token"].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updatePhoto = Photo.query.get(id)
        updatePhoto.url = form.data['url']
        updatePhoto.description = form.data["description"]
        updatePhoto.user_id = form.data["user_id"]
        updatePhoto.geo_location = form.data["geo_location"]
        updatePhoto.place_name = form.data["place_name"]
        db.session.commit()
        return updatePhoto.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@photo_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return {
        'deleted_photo': photo.to_dict()
    }