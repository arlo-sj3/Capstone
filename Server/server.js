'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const trucks = require('./routes/trucks.js');
const owner = require('./routes/owner.js');
const cors = require('cors');

// app.use(express.static('./public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use('/trucks',trucks);
app.use('/owner',owner);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
