const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var spawn = require("child_process").spawn;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const dataRouter = require('./routes/data');
app.use('/data', dataRouter);

const occupancyRouter = require('./routes/occupancy');
app.use('/occupancy', occupancyRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'));
}

app.listen(port, console.log(`Server is starting at ${port}`));
