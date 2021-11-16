from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

class AddCommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired(message="This field cannot be empty")])
    photo_id = IntegerField('photo_id', validators=[DataRequired(message="Photo not found")])
    user_id = IntegerField('user_id', validators=[DataRequired(message="You must be logged in to perform this action")])