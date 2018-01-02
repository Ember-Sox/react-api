exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sayings', (table) => {
      table.increments()
      table.string('saying')
      table.text('description')
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('sayings')
};
