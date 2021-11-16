from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, comment, db
from app.forms.comment_form import AddCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('')
def comments():
    comments = Comment.query.all()
    return {comment.id: comment.to_dict() for comment in comments}

@comment_routes.route('/<int:id>')
def get_comment(id):
    comment = Comment.query.get(id)
    return comment.to_dict()


@comment_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_comment(id):
    form = AddCommentForm()
    form["csrf_token"].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        updateComment = Comment.query.get(id)
        updateComment.body = form.data['body']
        updateComment.photo_id = form.data['photo_id']
        updateComment.user_id = form.data['user_id']
        db.session.commit()
        return updateComment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('', methods=["POST"])
@login_required
def post_comment():
    form = AddCommentForm()
    form["csrf_token"].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            body=form.data['body'],
            photo_id=form.data['photo_id'],
            user_id=form.data['user_id']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {
        "deleted_comment": comment.to_dict()
    }