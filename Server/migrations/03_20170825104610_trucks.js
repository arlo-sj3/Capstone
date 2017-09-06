
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trucks',(table)=>{
    table.increments('trucks_id');
    table.string('location').notNullable();
    table.string('event_venue');
    table.string('type').notNullable();
    table.string('menu').notNullable();
    table.string('contact').notNullable();
    table.string('picture').notNullable().defaultTo('/capstone/public/foodtruck.png');
    table.integer('fleet_number');
    table.integer('business_id').references('business_id');
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('trucks');
};
