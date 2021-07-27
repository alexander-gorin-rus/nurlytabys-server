const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_COMPASS, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, () => {
            console.log("Mongodb connection established")
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = DBConnection;