from app.models import db, Icon

# Adds a movie, you can add other movies here if you want
def seed_memberships():

    icon1 = Icon(
        image_url="https://i.pinimg.com/280x280_RS/38/1d/17/381d17279beb9a56bc1f22df17f62e69.jpg")
    icon2 = Icon(
        image_url="https://up.quizlet.com/bwj27-UrSj8-256s.jpg")
    icon3 = Icon(
        image_url="https://i.pinimg.com/280x280_RS/3a/d2/cc/3ad2cc3dea6225983487904da4be52f4.jpg")
    icon4 = Icon(
        image_url="https://ubisoft-avatars.akamaized.net/1fe5e6ae-9888-4acc-88b9-6da427d1617a/default_256_256.png")
    icon5 = Icon(
        image_url="https://i2.wp.com/novocom.top/image/czEuZaW0uYmF2aW0uY29t/orig/150210/aesthetic-cat-clothes-fashion-Favim.com-2463341.jpg")
    icon6 = Icon(
        image_url="https://avatarfiles.alphacoders.com/110/thumb-1920-110635.jpg")
    icon7 = Icon(
        image_url="https://avatarfiles.alphacoders.com/814/thumb-1920-81449.jpg")
    icon8 = Icon(
        image_url="https://avatarfiles.alphacoders.com/107/thumb-1920-107902.jpg")
    icon9 = Icon(
        image_url="https://www.trials-forum.co.uk/uploads/monthly_2018_04/felix.thumb.jpg.f21c5d4ac2a5411268c50ff345da2526.jpg")
    icon10 = Icon(
        image_url="https://a.thumbs.redditmedia.com/zUaEY_Mffodn0m9OboawDnHyuFbgCmijgqxlWi6WKT8.png")


    db.session.add(icon1)
    db.session.add(icon2)
    db.session.add(icon3)
    db.session.add(icon4)
    db.session.add(icon5)
    db.session.add(icon6)
    db.session.add(icon7)
    db.session.add(icon8)
    db.session.add(icon9)
    db.session.add(icon10)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_memberships():
    db.session.execute('TRUNCATE memberships RESTART IDENTITY CASCADE;')
    db.session.commit()
