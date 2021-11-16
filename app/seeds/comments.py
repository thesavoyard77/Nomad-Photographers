from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    demo = Comment(
        body='This photo sucks, have you considered improving?', photo_id='3', user_id='1')
    marnie = Comment(
        body='Beautiful', photo_id='1', user_id='2')
    bobbie = Comment(
        body='I want to go there so bad', photo_id='3', user_id='3')
    chris = Comment(
        body='Have you considered improving?', photo_id='2', user_id='4')

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
def undo_comments():
    db.session.execute('TRUNCATE COMMENTS RESTART IDENTITY CASCADE;')
    db.session.commit()
