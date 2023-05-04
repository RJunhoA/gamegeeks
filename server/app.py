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
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response(
                {'error': 'User not found'},
                404
            )
        else:
            data = request.get_json()
            if 'username' in data:
                user.username = data['username']
            if 'password' in data:
                user.password = data['password']
            if 'image' in data:
                user.image = data['image']
            if 'about' in data:
                user.about = data['about']
            db.session.add(user)
            db.session.commit()
            return make_response(
                user.to_dict(),
                200
            )
        
api.add_resource(UserById, '/users/<int:id>')

class Posts(Resource):
    def get(self):
        posts = [p.to_dict(rules=('-users.posts', )) for p in Post.query.all()]
        return make_response(
            posts,
            200
        )
    
    def post(self):
        data = request.get_json()
        new_post = Post(
            content = data['content']
        )
        db.session.add(new_post)
        db.session.commit()
        return make_response({
            "id": new_post.id,
            "content": new_post.content,
            "created_at": new_post.created_at
            },
            201
        )

api.add_resource(Posts, '/posts')

class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter(Post.id == id).first()
        if post:
            return make_response(
                post.to_dict(rules=('-users', )),
                200
            )
        return make_response(
            {'error': 'could not find post'},
            400
        )
    
    def patch(self, id):
        data = request.get_json()
        post = Post.query.filter(Post.id == id).first()
        try:
            for attr in data:
                setattr(post, attr, data[attr])
        except:
            return make_response(
                {},
                400
            )
        db.session.add(post)
        db.session.commit()
        return make_response(post.to_dict(), 202)
    
    def delete(self, id):
        post = Post.query.filter(Post.id == id).first()
        if not post:
            return make_response({'error': '404 post not found'}, 404)
        else:
            db.session.delete(post)
            db.session.commit()
        return make_response({}, 204)
    
api.add_resource(PostsById, '/posts/<int:id>')

class Likes(Resource):
    def post(self):
        data = request.get_json()
        new_like = Like(
            user_id = data['user_id'],
            post_id = data['post_id']
        )
        db.session.add(new_like)
        db.session.commit()
        return make_response(
            new_like.post.to_dict(rules=('-users.posts', 'likes')),
            201
        )

api.add_resource(Likes, '/likes')

class LikesById(Resource):
    def delete(self, id):
        like = Like.query.filter(Like.id == id).first()
        if not like:
            return make_response({'error': '404 like not found'}, 404)
        else:
            db.session.delete(like)
            db.session.commit()
        return make_response({}, 204)

api.add_resource(LikesById, '/likes/<int:id>')

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

@app.before_request
def before_request():
    if not request.path.startswith('/login') and not request.path.startswith('/signup'):
        if 'user_id' not in session:
            return {'error': 'Unauthorized request'}, 401


if __name__ == '__main__':
    app.run(port=5555, debug=True)