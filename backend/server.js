const app = require ('./app');
const connectDatabase = require('./config/database');
const dotenv = require ('dotenv')
// environment variable setup
dotenv.config({ path: 'backend/config/config.env'});

const PORT = process.env.PORT
// const PORT = 4000
const URI = process.env.URI

// DB connection
connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} as a ${process.env.NODE_ENV} project`);
});