# EDMTut.r Database

This project was built as a back-end to be integrated with EDMTut.r. It is built with Node, Express, Knex and Postgres, and deployed with CircleCI and Heroku.

Root for endpoints: [here](https://db-edm.herokuapp.com/)


#### Public Endpoints:

GET /api/v1/genres
* Returns all genres

GET /api/v1/songs
* Returns all songs 

GET /api/v1/genres/:id
* Returns genre details based on ID

GET /api/v1/genres/:id/songs 
* Returns songs for a genre by ID

GET /api/v1/songs/:id
* Returns a song by ID