'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('owner_business').del()
    .then(function () {
      // Inserts seed entries
      return knex('owner_business')
      .insert([{
       id:1,
       owner_id:1,
	      business_id:1
        }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('owner_business_id_seq', (SELECT MAX(id) FROM owner_business));"
      );
    });
};
