require('dotenv').config()
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const notesRouting = require("./routes/notes");
const mongoose = require("mongoose");
const requestLogger = require('./Utilities/requestLogger');

//Middle wares
app.use(bodyparser.json());
app.use(requestLogger);

//Routes
app.use("/", notesRouting);

//DB connection and 
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log(`DB CONNECTED ${process.env.DB}`);
}).catch(() => {
    console.log("SORRY DB IS NOT CONNECTED PLEASE TRY AGAIN");
});

//server creation
app.listen(process.env.PORT, () => {
    console.log(`SERVER IS UP AND RUNNING AT PORT = ${process.env.PORT}`);
});