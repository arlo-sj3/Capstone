'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([{
	trucks_id:1,
    location: '393 Washington Ave, Golden, CO 80403',
    type: 'Grillables',
    menu: 'http://longislandreport.org/wp-content/uploads/2011/12/LIVE-Menu.jpg',
    contact: '3035193825',
    picture: '/capstone/public/foodtruck.png',
    fleet_number: 1,
    business_id: 1
},
{
trucks_id:2,
location: '920 12th St, Golden, CO 80401',
type: 'Grillables',
menu: 'http://longislandreport.org/wp-content/uploads/2011/12/LIVE-Menu.jpg',
contact: '3035193825',
picture: '/capstone/public/foodtruck.png',
fleet_number: 2,
business_id: 1
},
{
trucks_id:3,
location: '900 Washington Ave, Golden, CO 80401',
type: 'Grillables',
menu: 'http://longislandreport.org/wp-content/uploads/2011/12/LIVE-Menu.jpg',
contact: '3035193825',
picture: '/capstone/public/foodtruck.png',
fleet_number: 3,
business_id: 1
}

]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('trucks_trucks_id_seq', (SELECT MAX(trucks_id) FROM trucks));"
      );
    });
};
