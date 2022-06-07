require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');

const app = express();
const port = 8080;

app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});