from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Photo


class AddPhotoForm(FlaskForm):
    url = StringField('url', validators=[DataRequired(message="This field cannot be empty"), URL(require_tld=True,
     message='Please enter a valid URL')])
    description = TextAreaField('description', validators=[DataRequired(message="This field cannot be empty")])
    user_id = IntegerField('user_id', validators=[DataRequired(message="You must be logged in to perform this action")])
    geo_location = StringField('geo_location', validators=[DataRequired()])
    place_name = StringField('place_name', validators=[DataRequired(message="This field cannot be empty")])
