from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follow = db.Table(
    "follows",
    db.Column("user1_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("user2_id", db.Integer, db.ForeignKey("users.id"), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_photos = db.relationship('Photo', back_populates = "users", cascade="all, delete")
    comments = db.relationship('Comment', back_populates='user', lazy='subquery')

    follows_association = db.relationship("User", secondary=follow, primaryjoin=(follow.c.user1_id == id),
    secondaryjoin=(follow.c.user2_id == id), backref=db.backref("follow", lazy="dynamic"), lazy="dynamic")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
