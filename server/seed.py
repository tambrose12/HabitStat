from random import randint, choice as rc

from app import app
from models import db, User, Habit, HabitStat


with app.app_context():

    User.query.delete()
    Habit.query.delete()
    HabitStat.query.delete()

    db.session.commit()

    u1 = User(username='user')
    u2 = User(username='billy')

    u1.password_hash = 'password'
    u2.password_hash = 'password'

    db.session.add_all([u1, u2])
    db.session.commit()

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String)
    # category = db.Column(db.String)
    # goal = db.Column(db.Integer)

    # Goal in Cups
    water = Habit(name="Water Intake", category="health", goal=8)
    # Goal in Showers per day (Yes or no?)
    shower = Habit(name="Take a Shower", category="health", goal=1)

    # Goal in Minutes
    exercise30 = Habit(name="30 Mintues of Exercise",
                       category="exercise", goal=30)
    exercise15 = Habit(name="15 Minutes of Exercise",
                       category="exercise", goal=15)
    # Goal in Minutes
    meditate30 = Habit(name="30 Mintue Meditation",
                       category="mental health", goal=30)
    meditate15 = Habit(name="15 Minute Meditation",
                       category="mental health", goal=15)
    # Goal in Minutes
    read30 = Habit(name="30 Mintues Reading",
                   category="mental health", goal=30)
    read15 = Habit(name="15 Minute Reading", category="mental health", goal=15)

    # created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # amount = db.Column(db.Float, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'))
    hs1 = HabitStat(amount=5, user_id=2, habit_id=1)

    db.session.add_all([water, shower, exercise30, exercise15,
                       meditate30, meditate15, read30, read15])
    db.session.commit()

    db.session.add(hs1)
    db.session.commit()
