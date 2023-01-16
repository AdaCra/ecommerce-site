//Handling uncaught exception errors
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log('SERVER SHUTDOWN due to uncaught exceptions');
    process.exit(1);
})

const app = require ('./app');
const connectDatabase = require('./config/database');
require('dotenv').config({ path: '.env'});

//environment variables
const PORT = process.env.PORT
const URI = process.env.URI

// DB connection
connectDatabase();

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} in ${process.env.NODE_ENV}`);
});

// Handling promise rejections
process.on('unhandledRejection', err =>{
    console.log(`ÈRROR: ${err.stack}`);
    console.log('SERVER SHUTDOWN due to unhandled promise rejections');
    server.close(()=>{
    process.exit(1)
    })
});
