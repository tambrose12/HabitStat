from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import db, User


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'


migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)


class Home(Resource):
    def get(self):
        return "Welcome to Habitstat"


api.add_resource(Home, '/')


class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


api.add_resource(Login, '/login')


class CheckSession(Resource):

    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return make_response(user.to_dict(), 200)
        else:
            return {'message': '401: Not Authorized'}, 401


api.add_resource(CheckSession, '/check_session')


class Logout(Resource):

    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204

        return {'error': '401 Unauthorized'}, 401


api.add_resource(Logout, '/logout')


class Signup(Resource):

    def post(self):
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')
        # image = data.get('image_url')

        user = User(
            username=username,
            image='https://mystiquemedicalspa.com/wp-content/uploads/2014/11/bigstock-159411362-Copy-1.jpg'
        )

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:
            print('here!')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())
            return user.to_dict(), 201

        except IntegrityError:
            print('no, here!')
            return {'error': '422 Unprocessable Entity'}, 422


api.add_resource(Signup, '/signup', endpoint='signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
