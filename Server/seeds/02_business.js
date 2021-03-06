'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('business').del()
    .then(function () {
      // Inserts seed entries
      return knex('business').insert([{
	business_id:1,
  owner_id: 1,
  	name:'Bobs Burgers',
  	fleet_size:3
}
]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('business_business_id_seq', (SELECT MAX(business_id) FROM business));"
      );
    });
};
