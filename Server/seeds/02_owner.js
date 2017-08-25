'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('owner').del()
    .then(function () {
      // Inserts seed entries
      return knex('owner').insert([{
	id:1,
  	name:'Bob',
}
]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('owner_id_seq', (SELECT MAX(id) FROM owner));"
      );
    });
};
