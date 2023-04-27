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


class Habits(Resource):
    def get(self):
        habits = [h.to_dict(only=('id', 'name', 'category', 'goal'))
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
        stats = [s.to_dict() for s in HabitStat.query.filter_by()]
        return make_response(stats, 200)

    def post(self):
        data = request.get_json()
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


api.add_resource(HabitStatsById, '/stats/<int:id>')


class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return make_response(user.to_dict(), 200)


api.add_resource(UserById, '/user/<int:id>')

# class StatByUserID(Resource):
#     def get(self, id):
#         user = User.query.filter_by(id=id).first()

#         today = datetime.date.today()
#         start_date = today - datetime.timedelta(days=today.weekday())
#         end_date = start_date + datetime.timedelta(days=6)
#         # stats = [s for s in HabitStat.query.filter_by(user_id=id).all()]
#         week_history = HabitStat.query.filter_by(user_id=id).filter(
#             HabitStat.created_at.between(start_date, end_date)).all()

#         week_history_dict = [w.to_dict() for w in week_history]
#         user_dict = user.to_dict()

#         return make_response(week_history_dict, 200)

#         id = session.get('user_id')


# api.add_resource(StatByUserID, '/users/<int:id>/stats')

# class StatHistory(Resource):
#     def get(self):
#         if session.get('user_id'):
#             user = User.query.filter(User.id == session['user_id']).first()
#         stats = [s.to_dict()
#                  for s in HabitStat.query.filter_by(user_id=user.id).all()]

#         today = datetime.date.today()
#         start_date = today - datetime.timedelta(days=today.weekday())
#         end_date = start_date + datetime.timedelta(days=6)
#         week_history = stats.filter(
#             stats.created_at.between(start_date, end_date)).all()

#         return make_response(week_history, 200)


# api.add_resource(StatHistory, '/history')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
