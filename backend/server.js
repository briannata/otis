const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const dataRouter = require('./routes/data');
app.use('/data', dataRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));
}

app.listen(port, console.log(`Server is starting at ${port}`));
