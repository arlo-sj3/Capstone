
exports.up = function(knex, Promise) {
  return knex.schema.createTable('business',(table)=>{
    table.increments();
    table.string('name').notNullable();
    table.integer('fleet_size').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('business');
};
