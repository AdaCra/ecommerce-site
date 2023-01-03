const express = require("express");
const env = require("dotenv");
const {MongoClient} = require('mongodb');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

// routes
const userRoutes = require('./src/routes/user')

//environment variables
env.config();
const port = process.env.PORT;
const uri = process.env.URI;

//app reader
app.use(express.json());
app.use('/api', userRoutes)
// mongoose connection
mongoose.connect(uri)
.then(()=>{
    console.log('Database Connected');
  });


//Listen for port
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
