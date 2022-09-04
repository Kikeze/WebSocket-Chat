const mongoose = require("mongoose");


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DBSERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,

        });
        console.log("Base de datos conectada");
    }
    catch(err) {
        console.log( err );
        throw new Error("Error en la base de datos");
    }
}


module.exports = {
    dbConnection
}




















