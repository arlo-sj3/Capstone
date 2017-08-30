'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();



// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex.select('id','name','fleet_size').from('business')
    .then(function(data) {
      // console.log('hello')

      return res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id - 1;
  knex.select('id','name','fleet_size').from('business')
    .then(function(data) {
      return res.send(data[id]);
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/', (req, res, next) => {
  knex('business')
    .insert(req.body)
    .returning(['id','name','fleet_size'])
    .then((result) => {
      // console.log(result[0].email);
      // res.cookie('business', result[0].email)
      // console.log(result)
      res.send(result[0])
    })
    .catch((err)=>{
      next(err);
    })
});

router.patch('/:id', (req, res, next) => {
  knex('business')
    .returning(['id','name','fleet_size'])
    .update(req.body)
    .where('id', req.params.id)
    .then(result => {
      res.send(result[0])
    })

});

router.delete('/:id', (req, res, next) => {
  knex('business')
    .returning(['id','name','fleet_size'])
    .del()
    .where('id', req.params.id)
    .then(result => {
      res.send(result[0])
    })
})

module.exports = router;
