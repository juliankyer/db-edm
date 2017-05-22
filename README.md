# db-edm

### Error on Circle CI build

cannot read property client of undefined 
  node modules/knex/lib/index.js:49
  
### Error when trying to make requests from Heroku
  
not allowed to load local resource

### Error Handling
I don't get where/how I describe the error here in the .catch. Not sure why this isn't connecting; maybe it's because most of the examples I've seen use an "if" statement to validate before allowing a request to execute. It seems like a using catch is a nicer way of doing this, but I don't know the syntax. You pass it an error, but where is that error defined or described?

`app.get('/api/v1/genres', (request, response) => {
  database('genres').select()
    .then(genres =>
      response.status(200).json(genres)
    )
    .catch((error) => {
      console.error(error)
    });
});`


### AUTHENTICATION

JWTs basically make sense to me, with one exception - do I need to have an authentication endpoint to use JWTs? For my project, I want an admin/guest login to control POST/PUT/PATCH/DELETE requests, but is that a necessary starting point?

Sad path testing
Query param Routes
Publish to Heroku
Status codes/error handling 
Linter
JWTs- if statement causing server to crash 