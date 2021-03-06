from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='I am the demo user, feel free to play around!')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', bio='I am a random user, not much depth to me!')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', bio='I am another random user, I love to travel!')
    chris = User(
        username='TheSavoyard', email='chris@aa.io', password='password', bio='I want to show you the places the average traveler does not see. The unknown monuments, historical buildings, and cultural sites that are only known by locals.')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(chris)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
