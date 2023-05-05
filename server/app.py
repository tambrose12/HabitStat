from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
import datetime
from config import app, api
from models import db, User, Habit, HabitStat


app.secret_key = "\xe1\x952Qs\x85$\xe6\x0b\xb6P\xf5\xb2;Q\xbc\xc5\xbf\x11Y\x8fY\xe0/"
# app.config['SESSION_TYPE'] = 'filesystem'


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
            # session['user_id'] = None
            session.clear()
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
            image='https://images.unsplash.com/photo-1601247387431-7966d811f30b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80'
        )
        # Photo by Joshua J. Cotten on Unsplash

        # the setter will encrypt this
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201

        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422


api.add_resource(Signup, '/signup', endpoint='signup')


class Habits(Resource):
    def get(self):
        habits = [h.to_dict(only=('id', 'name', 'category', 'goal', 'users'))
                  for h in Habit.query.all()]
        return make_response(habits, 200)

    def post(self):
        data = request.get_json()
        new_habit = Habit(
            name=data['name'], category=data['category'], goal=data['goal'])

        if new_habit.name == None or new_habit.name == "":
            return make_response({"error": "400: Validation error."}, 400)
        elif new_habit.category == None or new_habit.category == "":
            return make_response({"error": "400: Validation error."}, 400)
        elif new_habit.goal == None or new_habit.goal == "":
            return make_response({"error": "400: Validation error."}, 400)
        elif type(new_habit.goal) is not int:
            return make_response({"error": "400: Validation error."}, 400)
        else:
            db.session.add(new_habit)
            db.session.commit()
        return make_response(new_habit.to_dict(), 201)


api.add_resource(Habits, '/habits')


class HabitsById(Resource):
    def get(self, id):
        habit = Habit.query.filter_by(id=id).first()
        if habit == None:
            return make_response({'error': '404: Habit not found'}, 404)
        return make_response(habit.to_dict(), 200)

    def delete(self, id):
        habit = Habit.query.filter_by(id=id).first()
        if habit == None:
            return make_response({'error': '404: Habit not found'}, 404)
        db.session.delete(habit)
        db.session.commit()
        return make_response({'message': 'Habit Deleted'}, 204)


api.add_resource(HabitsById, '/habits/<int:id>')


class HabitStats(Resource):
    def get(self):
        stats = [s.to_dict()
                 for s in HabitStat.query.filter_by(user_id=session['user_id'])]
        return make_response(stats, 200)

    def post(self):
        data = request.get_json()

        try:
            new_stat = HabitStat(
                amount=data['amount'], user_id=data['user_id'], habit_id=data['habit_id'])

            if new_stat.amount == None or new_stat.amount == "":
                return make_response({"error": "400: Validation error."}, 400)
            elif new_stat.user_id == None or new_stat.user_id == "":
                return make_response({"error": "400: Validation error."}, 400)
            elif new_stat.habit_id == None or new_stat.habit_id == "":
                return make_response({"error": "400: Validation error."}, 400)
            else:
                db.session.add(new_stat)
                db.session.commit()

        except ValueError:
            db.session.rollback()
            return make_response({'error': 'ValueError'}, 422)

        return make_response(new_stat.to_dict(), 201)


api.add_resource(HabitStats, '/stats')


class HabitStatsById(Resource):
    def get(self, id):
        stat = HabitStat.query.filter_by(id=id).first()
        if stat == None:
            return make_response({'error': '404: Stat not found'}, 404)
        return make_response(stat.to_dict(), 200)

    def delete(self, id):
        stat = HabitStat.query.filter_by(id=id).first()
        if stat == None:
            return make_response({'error': '404: Stat not found'}, 404)
        db.session.delete(stat)
        db.session.commit()
        return make_response({'message': 'Stat Deleted'}, 201)

    def patch(self, id):
        data = request.get_json()

        stat = HabitStat.query.filter_by(id=id).first()
        if stat == None:
            return make_response({'error': 'Stat not found'}, 404)

        for attr in data:
            setattr(stat, attr, data[attr])

        try:
            db.session.add(stat)
            db.session.commit()
        except ValueError:
            db.session.rollback()
            return make_response({'error': 'ValueError'}, 422)

        response_dict = stat.to_dict()

        response = make_response(response_dict, 200)

        return response


api.add_resource(HabitStatsById, '/stats/<int:id>')


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return make_response(user.to_dict(), 200)

    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        if user == None:
            return make_response({'error': 'User not found'}, 404)

        for attr in data:
            setattr(user, attr, data[attr])

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return make_response({'error': 'validation errors'}, 422)

        response_dict = user.to_dict()

        response = make_response(response_dict, 200)

        return response

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user == None:
            return make_response({'error': 'User not found'}, 404)

        db.session.delete(user)
        db.session.commit()

        return make_response({'message': 'User Deleted'}, 201)


api.add_resource(UserById, '/user/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
