const mongoose = require ('mongoose');
mongoose.set('strictQuery', true)

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{
    }).then(con => {
        console.log(`connected to mongoDB HOST:${con.connection.host}`);
    })
}

module.exports= connectDatabase