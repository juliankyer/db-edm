
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('genres', function(table) {
      table.increments('id').primary();
      table.string('genre');
      table.string('link');
      table.string('description');
    }),
    
    knex.schema.createTable('songs', function(table) {
      table.increments('id').primary();
      table.string('artist');
      table.string('title');
      table.string('service');
      table.string('video');
      table.integer('genre_id').unsigned();
      table.foreign('genre_id').references('genres.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('genres'),
    knex.schema.dropTable('songs')
  ]);
};
