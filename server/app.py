from flask import make_response, request, session
from flask_restful import Resource

from config import app, db, api
from models import User

class Users(Resource):
    def get(self):
        return 'hello'

api.add_resource(Users, '/users')








if __name__ == '__main__':
    app.run(port=5555, debug=True)