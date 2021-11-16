from .db import db
from werkzeug.security import generate_password_hash, check_password_hash

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text, nullable = False)
    description = db.Column(db.Text, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    geo_location = db.Column(db.String(256), nullable = False)
    place_name = db.Column(db.String(100), nullable = False)

    users = db.relationship('User', back_populates = 'user_photos')
    comments = db.relationship("Comment", back_populates = 'photo', cascade="all, delete")

    def to_dict(self):
        return {
            'id' : self.id,
            'url' : self.url,
            'description' : self.description,
            'user_id' : self.user_id,
            'geo_location' : self.geo_location,
            'place_name' : self.place_name,
            'users' : self.users.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments]
        }