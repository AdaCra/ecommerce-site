const express = require('express');                         /*import express*/
const app = express();                                      /*assign express*/
const errorMiddleware = require('./middleware/errors')      /*import error handling*/
const products = require('./routes/product')                /*import route handling*/

app.use(express.json());

app.use('/api/v1', products);

app.use(errorMiddleware);

module.exports = app
