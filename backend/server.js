const app = require ('./app');
const connectDatabase = require('./config/database');
const dotenv = require ('dotenv')

const PORT = process.env.PORT
const URI = process.env.URI

// environment variable setup
dotenv.config({ path: 'backend/config/config.env'});
// DB connection
connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT} as a ${process.env.NODE_ENV} project`);
});