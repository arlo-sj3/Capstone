'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex.select('id','location','type','menu','contact','picture','business_id').from('trucks')
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
  knex.select('id','location','type','menu','contact','picture','business_id').from('trucks')
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
    .returning(['id','location','type','menu','contact','picture','business_id'])
    .then((result) => {
      console.log(result)
      res.send(result[0])
    })
});

router.patch('/:id', (req, res, next) => {
  knex('trucks')
    .returning(['id','location','type','menu','contact','picture','business_id'])
    .update(req.body)
    .where('id', req.params.id)
    .then(result => {
      res.send(result[0])
    })

});

router.delete('/:id', (req, res, next) => {
  knex('trucks')
    .returning(['id','location','type','menu','contact','picture','business_id'])
    .del()
    .where('id', req.params.id)
    .then(result => {
      res.send(result[0])
    })
})

module.exports = router;
