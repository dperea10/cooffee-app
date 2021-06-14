const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        //connection to DB MONGO ATLAS
       await mongoose.connect(process.env.URL_MONGO_CONNECTION ,{

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            
       });

       console.log("CONNECTION")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConnection
}