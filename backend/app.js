const express = require('express');                         /*import express*/
const app = express();                                      /*assign express*/
const products = require('./routes/product')                /*import route handling*/
const errorMiddleware = require('./middleware/errors')      /*import error handling*/

app.use(express.json());

app.use('/api/v1', products);

app.use(errorMiddleware);

module.exports = app
