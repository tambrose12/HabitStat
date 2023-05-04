from datetime import datetime, timedelta
from config import app, db
from models import HabitStat, StatHistory

with app.app_context():
    # Select data from the main database
    data = HabitStat.query.filter(
        HabitStat.created_at < datetime.today() - timedelta(days=1)).all()

    # Insert the data into the history database
    for item in data:
        new_day_stat = HabitStat(
            amount=0, user_id=item.user_id, habit_id=item.habit_id)
        history_item = StatHistory(
            created_at=item.created_at, amount=item.amount, user_id=item.user_id, habit_id=item.habit_id)
        db.session.add(history_item)
        db.session.add(new_day_stat)

    # Delete the data from the main database
    HabitStat.query.filter(
        HabitStat.created_at < datetime.today()).delete()

    # Commit the changes to both databases
    db.session.commit()
