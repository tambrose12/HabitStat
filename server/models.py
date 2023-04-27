from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-habitstats.user',
                       '-habitstats.user_id', '-habits.users')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image = db.Column(db.String)

    habitstats = relationship('HabitStat', backref='user')
    habits = association_proxy('habitstats', 'habits')

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


class Habit(db.Model, SerializerMixin):
    __tablename__ = 'habits'

    serialize_rules = ('-habitstats.habit',
                       '-habitstats.habit_id', '-users.habits')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    category = db.Column(db.String)
    goal = db.Column(db.Integer)

    habitstats = relationship('HabitStat', backref='habit')
    users = association_proxy('habitstats', 'users')


class HabitStat(db.Model, SerializerMixin):
    __tablename__ = 'habitstats'

    serialize_rules = ('-habit.habitstats', '-habit.users',
                       '-user.habitstats', '-user.habits')

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'))
