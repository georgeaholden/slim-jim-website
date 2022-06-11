require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');

const app = express();

let port = process.env.PORT;
if (process.env.PROD === 'true') {
    port = 8080;
}

app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
});