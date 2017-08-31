'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();



// YOUR CODE HERE

router.get('/', (req, res, next) => {
  knex.select('owner_id','name','email','password').from('owner')
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
  knex.select('owner_id','name','email','password').from('owner')
    .then(function(data) {
      return res.send(data[id]);
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/', (req, res, next) => {
  knex('owner')
    .insert(req.body)
    .returning(['owner_id','name','email','password'])
    .then((result) => {
      // console.log(result[0].email);
      // res.cookie('owner', result[0].email)
      // console.log(result)
      res.send(result[0])
    })
    .catch((err)=>{
      next(err);
    })
});

router.patch('/:id', (req, res, next) => {
  knex('owner')
    .returning(['owner_id','name','email','password'])
    .update(req.body)
    .where('owner_id', req.params.id)
    .then(result => {
      res.send(result[0])
    })

});

router.delete('/:id', (req, res, next) => {
  knex('owner')
    .returning(['owner_id','name','email','password'])
    .del()
    .where('owner_id', req.params.id)
    .then(result => {
      res.send(result[0])
    })
})

module.exports = router;
