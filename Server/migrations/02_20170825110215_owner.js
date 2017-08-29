
exports.up = function(knex, Promise) {
  return knex.schema.createTable('owner',(table)=>{
    table.increments();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
  })
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('owner');
};
