from random import randint, choice as rc

from app import app
from models import db, User


with app.app_context():

    User.query.delete()

    db.session.commit()

    u1 = User(username='user', _password_hash='password')

    db.session.add(u1)
    db.session.commit()
