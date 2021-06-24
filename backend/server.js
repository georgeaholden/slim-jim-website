require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');

const app = express();
const port = process.env.PORT;

// Test DB connection here
async function testDbConnection() {
    try {
        await db.createPool();
        await db.getPool().getConnection();
        console.log('Connected to Database Successfully');
    } catch (err) {
        console.error(`Unable to connect to MySQL: ${err.message}`);
        process.exit(1);
    }
}

testDbConnection()
    .then(function () {
        app.listen(port, function () {
            console.log(`Listening on port: ${port}`);
        });
    });