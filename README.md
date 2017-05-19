# db-edm

cannot read property client of undefined 
  node modules/knex/lib/index.js:49
  
not allowed to load local resource

id
genre 
link 
description


post is making a new entry, but with null for values

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

### POST 

I don't know why my post is creating new data, but the values passed into the request aren't making it into the database. So a new genre is being created with an id, but the values are null.

### 
