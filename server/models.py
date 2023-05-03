from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import datetime


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-habitstats.user', '-_password_hash'
                       '-habitstats.user_id', '-habits.users', 'week_history', 'habits')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image = db.Column(db.String)

    habitstats = relationship('HabitStat', backref='user')
    habits = association_proxy('habitstats', 'habit')

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f'<User {self.username}>'

    @property
    def week_history(self):
        today = datetime.date.today()
        start_date = today - datetime.timedelta(days=today.weekday() + 6)
        end_date = start_date + datetime.timedelta(days=12)

        week_history = HabitStat.query.filter(
            HabitStat.created_at.between(start_date, end_date)).all()

        return week_history


class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    serialize_rules = ('-habitstats.habit', '-habitstats.habit_id', '-users.habits',
                       'users', '-users.habitstats', '-users.week_history', '-users._password_hash')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    goal = db.Column(db.Integer, nullable=False)

    habitstats = relationship('HabitStat', backref='habit')
    users = association_proxy('habitstats', 'user')


class HabitStat(db.Model, SerializerMixin):
    __tablename__ = 'habitstats'

    serialize_rules = ('-habit.habitstats', '-habit.users',
                       '-user')

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(
        db.DateTime, server_default=db.func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey(
        'habits.id'), nullable=False)

    @validates('amount')
    def validate_amount(self, key, amt):
        if type(amt) is not int:
            raise TypeError('Amount must be a number.')
        elif amt < 1 or amt > 99:
            raise ValueError("Invalid number")
        return amt
