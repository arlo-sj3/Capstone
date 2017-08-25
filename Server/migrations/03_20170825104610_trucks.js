
exports.up = function(knex, Promise) {
  return knex.schema.createTable('trucks',(table)=>{
    table.increments();
    table.string('location').notNullable();
    table.string('type').notNullable();
    table.string('menu').notNullable();
    table.string('contact').notNullable();
    table.string('picture').notNullable().defaultTo('/capstone/public/foodtruck.png');
    table.integer('business_id').references('business_id');
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('trucks');
};
