
exports.up = function(knex, Promise) {
  return knex.schema.createTable('business',(table)=>{
    table.increments('business_id');
    table.integer('owner_id').references('owner.owner_id').onDelete('cascade');
    table.string('name').notNullable();
    table.integer('fleet_size').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('business');
};
