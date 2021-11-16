from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    chris = Photo(
        url='https://media.cntraveler.com/photos/5b8576320c5e123ef6ed3d55/master/pass/Budapest_GettyImages-512278610.jpg',
        description='The Parliament building in Budapest', user_id='4', geo_location='47.505606460361754, 19.039616367359486',
         place_name='Budapest' )
    marnie = Photo(
        url='https://www.fodors.com/assets/destinations/2869/tower-bridge-london-england_980x650.jpg',
        description='London Bridge, not really but a bridge in London', user_id='2', geo_location='51.48714347929283, -0.1261351956304025',
         place_name='London' )
    bobbie = Photo(
        url='https://i.insider.com/5d26280921a86107bb51bd92?width=700',
        description='The electric atmosphere of Tokyo', user_id='3', geo_location='35.680646272238285, 139.76926630965156',
         place_name='Tokyo' )
    Berlin = Photo(
        url='https://i.natgeofe.com/n/9e138c12-712d-41d4-9be9-5822a3251b5a/brandenburggate-berlin-germany.jpg',
        description='Brandenburg Gate, Germany\'s answer to the Arche De Triomphe', user_id='4', geo_location='52.51626154223317, 13.37768800675265',
         place_name='Berlin' )
    Sao_Paulo = Photo(
        url='https://www.thesmoothescape.com/wp-content/uploads/2019/03/Sao-Paulo-skyline-sunset-header.jpg',
        description='Sao Paulo, tropical city of lights', user_id='1', geo_location='-23.592207995194993, -46.69009723040551',
         place_name='Sao Paulo' )
    Detroit = Photo(url='https://media.istockphoto.com/photos/abandoned-house-in-detroit-mi-picture-id110919266?k=20&m=110919266&s=612x612&w=0&h=rAhv1s6EPjl1Zv49dNFvMeFcLfqI2a2n6T_zEWVylwc=',
        description='Detroit, tropical city of lights', user_id='1', geo_location='42.36048847079067, -83.13906261139918',
         place_name='Detroit'
    )
  

    db.session.add(chris)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Berlin)
    db.session.add(Sao_Paulo)
    db.session.add(Detroit)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
