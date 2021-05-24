from app.models import db, Membership

# Adds a movie, you can add other movies here if you want
def seed_memberships():

    membership_low = Membership(type='Standard', price=10)
    membership_mid = Membership(type='HD', price=15)
    membership_high = Membership(type='Premium', price=20)

    db.session.add(membership_low)
    db.session.add(membership_mid)
    db.session.add(membership_high)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_memberships():
    db.session.execute('TRUNCATE memberships RESTART IDENTITY CASCADE;')
    db.session.commit()
