# Nomad-Photographers
#### *By Christopher Felix*

___

**Table of Contents**
* Introduction
* Frontend Overview 
* Backend Overview
* Conclusion and the future of the application

## Nomad-Photographers Introduction

Nomad-Photographers is a full stack application that will allow users to upload their travel photographs, map where the photo was taken, brows others photographs, and follow other users. 

Nomad-Photographers features custom carousel, dymanically loaded meta-information on each photo and will impliment even more features in the near future.

Nomad-Photographers features [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial) and photo uploads via [Amazon S3 media sharing](https://aws.amazon.com/media-sharing/).

The social tab will allow user to see updates on the people they follow, while the search function will allow them to brows locations to decide their next trip.

## Frontend Overview

Once completed, Nomad-Photographers will feature many front-end UI elements that make it a front end focused web application.

### Frontend Technologies Used:

#### React: 
Nomad-Photographers uses react for fast, dynamically loaded pages that allow information to tranisition smoothly.

#### Redux:
Redux is used to query the backend and store data in the store.The store is a cache of relevant data that is stored
client side in order to update the state seemlessly.

for more information on [Redux](https://redux.js.org/).

Dependancy management on the front end is handled with 
[npmjs](https://www.npmjs.com/). Which is also used to run the front-end server in development.



The database RDBMS is in [SQL](http://www.sqlcourse.com/intro.html)

Version control is managed through [Alembic](https://alembic.sqlalchemy.org/en/latest/tutorial.html) which allows the database to be rolled back to an earlier version if necassary.

Database queries are handled through [SQLAlchemy](https://docs.sqlalchemy.org/en/14/orm/tutorial.html) which is an ORM tooklkit that makes queries and relationships easy to manage. In combination with SQLAlchemy, [Flask](https://flask.palletsprojects.com/en/2.0.x/) is used for route handling. Flask runs the backend application during development.

Dependancy management is handled through [Pipenv](https://realpython.com/pipenv-guide/#problems-that-pipenv-solves).

## Conclusion and the future of the application

I sought to make a challenging website that exploited the dynamic nature of React and the data at the ready nature of Redux. It was a challenge to build my own carousel with dynamic information. There were many challenges along the way with the front end tech especially, from css being affected by invisible divs to props not passing the correct information. But the experience taught me a great deal about both Flask SQLAlchemy and React-Redux technologies. I've expanded my toolkit drastically and feel much more comfortable tackling challenging tech. 

The project is not done though. A social media aspect is planned as well. You will be able to follow other users and see where they have been. 

Thank you for visiting my app!# Nomad-Photographers
