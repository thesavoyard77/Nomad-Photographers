from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable = False)
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    user = db.relationship("User", back_populates='comments', lazy='subquery')
    photo = db.relationship("Photo", back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'photo_id': self.photo_id,
            'user_id': self.user_id,
            'user_name': self.user.to_dict()
        }
