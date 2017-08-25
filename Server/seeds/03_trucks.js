'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([{
	id:1,
    location: '393 Washington Ave, Golden, CO 80403',
    type: 'Grillables',
    menu: 'http://longislandreport.org/wp-content/uploads/2011/12/LIVE-Menu.jpg',
    contact: '3035193825',
    picture: '/capstone/public/foodtruck.png',
    business_id: 1



}
]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trucks_id_seq', (SELECT MAX(id) FROM trucks));"
      );
    });
};
