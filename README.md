# db-edm

### Error on Circle CI build

cannot read property client of undefined 
  node modules/knex/lib/index.js:49
  
### Error when trying to make requests from Heroku
  
not allowed to load local resource

Query param Routes
Publish to Heroku
Linter


/ set CLIENT_SECRET and TOKEN as environment variables in CircleCI

// refactor any instances of those variables to first check for environment variables. e.g. `process.env.CLIENT_SECRET || config.CLIENT_SECRET`

// set CLIENT_SECRET and TOKEN as environment variables in Heroku