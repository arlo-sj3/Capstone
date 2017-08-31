
exports.up = function(knex, Promise) {
  return knex.schema.createTable('owner_business',(table)=>{
    table.increments('owner_business_id');
    table.integer('owner_id').references('owner_id');
    table.integer('business_id').references('business_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owner_business');
};
