from flask import make_response, request, session
from flask_restful import Resource

from config import app, db, api
from models import User, Post, Like


class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(
            users,
            200
        )

api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
        else:
            return make_response(
                user.to_dict(),
                200
            )
api.add_resource(UserById, '/users/<int:id>')

class Posts(Resource):
    def get(self):
        posts = [p.to_dict() for p in Post.query.all()]
        return make_response(
            posts,
            200
        )

api.add_resource(Posts, '/posts')


class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username = data['username'],
            image = data['image'],
            _password = data['password']
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response(
            {},
            200
        )
api.add_resource(Signup, '/signup')
        

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(
            User.username == data['username']
        ).first()

        password = data['password']
        if not user:
            return {'error': 'Must enter a valid username and password'}, 401

        elif user.authenticate(password):
            session['user_id'] = user.id
            return make_response(
                user.to_dict(),
                200
            )
        return {'error': 'Must enter a valid username and password'}, 401
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.clear()
        return {'message': '204: No Content'}, 204
        

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401
        
api.add_resource(CheckSession, '/check_session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)