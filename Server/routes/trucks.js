'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex.select('trucks_id','location','event_venue','type','menu','contact','picture','fleet_number','business.business_id', 'business.name')
  .from('trucks')
  .join('business', 'trucks.business_id', 'business.business_id')
    .then(function(data) {
      console.log('hello')
      return res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id - 1;
  knex.select('trucks_id','location','event_venue','type','menu','contact','picture','fleet_number','business_id').from('trucks')
    .then(function(data) {
      return res.send(data[id]);
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/', (req, res, next) => {
  knex('trucks')
    .insert(req.body)
    .returning(['trucks_id','location','event_venue','type','menu','contact','picture','fleet_number','business_id'])
    .then((result) => {
      console.log(result)
      res.send(result[0])
    })
});

router.patch('/:id', (req, res, next) => {
  knex('trucks')
    .returning(['trucks_id','location','event_venue','type','menu','contact','picture','fleet_number','business_id'])
    .update(req.body)
    .where('trucks_id', req.params.id)
    .then(result => {
      res.send(result[0])
    })

});

router.delete('/:id', (req, res, next) => {
  knex('trucks')
    .returning(['trucks_id','location','event_venue','type','menu','contact','picture','fleet_number','business_id'])
    .del()
    .where('trucks_id', req.params.id)
    .then(result => {
      res.send(result[0])
    })
})

module.exports = router;
