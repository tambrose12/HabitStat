from random import randint, choice as rc

from app import app
from models import db, User, Habit, HabitStat


with app.app_context():

    # Habit.query.delete()

    # db.session.commit()

    # # u1 = User(username='user')
    # # u2 = User(username='billy')

    # # u1.password_hash = 'password'
    # # u2.password_hash = 'password'

    # # db.session.add_all([u1, u2])
    # # db.session.commit()

    # # id = db.Column(db.Integer, primary_key=True)
    # # name = db.Column(db.String)
    # # category = db.Column(db.String)
    # # goal = db.Column(db.Integer)

    # # Goal in Cups
    # water = Habit(name="Water Intake", category="health", goal=8)
    # # Goal in Showers per day (Yes or no?)
    # shower = Habit(name="Take a Shower", category="health", goal=1)

    # # Goal in Minutes
    # exercise30 = Habit(name="30 Mintues of Exercise",
    #                    category="exercise", goal=30)
    # exercise15 = Habit(name="15 Minutes of Exercise",
    #                    category="exercise", goal=15)
    # # Goal in Minutes
    # meditate30 = Habit(name="30 Mintue Meditation",
    #                    category="meditation", goal=30)
    # meditate15 = Habit(name="15 Minute Meditation",
    #                    category="meditation", goal=15)
    # # Goal in Minutes
    # read30 = Habit(name="30 Mintues Reading",
    #                category="reading", goal=30)
    # read15 = Habit(name="15 Minute Reading", category="reading", goal=15)

    # pets = Habit(name="Feed Pets", category="lifestyle", goal= )

    # created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # amount = db.Column(db.Float, nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'))
    hs3 = HabitStat(amount=25, user_id=2, habit_id=6)
    hs4 = HabitStat(amount=9, user_id=2, habit_id=1)
    hs5 = HabitStat(amount=23, user_id=2, habit_id=3)

    # db.session.add_all([water, shower, exercise30, exercise15,
    #                    meditate30, meditate15, read30, read15])
    # db.session.commit()

    db.session.add_all([hs3, hs4, hs5])
    db.session.commit()
