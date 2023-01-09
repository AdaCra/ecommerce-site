const express = require('express');                         /*import express*/
const app = express();                                      /*assign express*/

const cookieParser = require('cookie-parser')

/*import error handling*/
const errorMiddleware = require('./middleware/errors') 

/*import route handling*/
const products = require('./routes/product')                
const auth = require('./routes/auth')

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1', products);
app.use('/api/v1', auth);

app.use(errorMiddleware);

module.exports = app
