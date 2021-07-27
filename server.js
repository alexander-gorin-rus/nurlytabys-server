//Initializing Application
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
require('dotenv').config();
const { readdirSync } = require('fs')


//Use Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use('/uploadsMainPageInfo', express.static('uploadsMainPageInfo'));

//Import Mongo Database
const mongoConnection = require('./config/mongodb');

//Dinamic Routes Autoloading
readdirSync('./routes').map((r) => app.use("/api/v1", require("./routes/" + r)));

//Mongo Database connection
mongoConnection();



const port = process.env.PORT || 8002
app.listen(port, () => {
    console.log(`Server side for nurlytabys is running on port ${port}`)
})
