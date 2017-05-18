// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/db_edm',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }

};
