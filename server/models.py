from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password = db.Column(db.String)
    image = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    @hybrid_property
    def password_hash(self):
        return self._password

    @password_hash.setter
    def password_hash(self, password=""):
        print('')
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password, password.encode('utf-8'))
    
    @validates('_password')
    def pass_hashing(self, key, attr):

        password_hash = bcrypt.generate_password_hash(attr.encode('utf-8'))
        return password_hash.decode('utf-8')