from app.models import db, Photo


# Adds a demo user, you can add other users here if you want
def seed_photos():
    budapest = Photo(
        url='https://media.cntraveler.com/photos/5b8576320c5e123ef6ed3d55/master/pass/Budapest_GettyImages-512278610.jpg',
        description='The Parliament building in Budapest', user_id='4', geo_location='{"lat":47.505606460361754,"lng":19.039616367359486}',
         place_name='Budapest, Hungary' )
    london = Photo(
        url='https://www.fodors.com/assets/destinations/2869/tower-bridge-london-england_980x650.jpg',
        description='London Bridge, not really but a bridge in London', user_id='2', geo_location='{"lat":51.48714347929283,"lng":0.1261351956304025}',
         place_name='London, England' )
    tokyo = Photo(
        url='https://i.insider.com/5d26280921a86107bb51bd92?width=700',
        description='The electric atmosphere of Tokyo', user_id='3', geo_location='{"lat":35.680646272238285,"lng":139.76926630965156}',
         place_name='Tokyo, Japan' )
    Berlin = Photo(
        url='https://i.natgeofe.com/n/9e138c12-712d-41d4-9be9-5822a3251b5a/brandenburggate-berlin-germany.jpg',
        description='Brandenburg Gate, Germany\'s answer to the Arche De Triomphe', user_id='4', geo_location='{"lat":52.51626154223317,"lng":13.37768800675265}',
         place_name='Berlin, Germany' )
    Sao_Paulo = Photo(
        url='https://www.thesmoothescape.com/wp-content/uploads/2019/03/Sao-Paulo-skyline-sunset-header.jpg',
        description='Sao Paulo, tropical city of lights', user_id='1', geo_location='{"lat":-23.592207995194993,"lng":-46.69009723040551}',
         place_name='Sao Paulo, Brazil' )
    Hunedoara = Photo(url='https://fshoq.com/images/blog/entry/corvin-castle-romania-hunedoara-big-21.jpg',
        description='About 3 hours from Budapest, a must see if you\'re in the region', user_id='1', geo_location='{"lat":45.74942990306091,"lng":22.888336226950067}',
         place_name='Hunedoara, Romania'
    )
  
 
    db.session.add(budapest)
    db.session.add(london)
    db.session.add(tokyo)
    db.session.add(Berlin)
    db.session.add(Sao_Paulo)
    db.session.add(Hunedoara)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_photos():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
