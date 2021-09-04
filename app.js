const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectionString, port } = require('./utils/config');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

app.use(bodyParser.json());

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port)
        console.log('SERVER IS UP AND RUNNING!');
        console.log('SERVER CONNECTED TO DATABASE');
    })
    .catch(err => console.log(err));


app.use(authRoutes);