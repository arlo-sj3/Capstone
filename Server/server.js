'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const trucks = require('./routes/trucks.js');
const owner = require('./routes/owner.js');
const business = require('./routes/business.js');
const owner_business = require('./routes/owner_business.js');
const cors = require('cors');
const path = require('path')


// app.use(express.static('./public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('/trucks',trucks);
app.use('/owner',owner);
app.use('/business',business)
app.use('owner_business',owner_business)
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
