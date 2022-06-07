const express = require('express');
const { allowCrossOriginRequestsMiddleware } = require('../app/middleware/cors.middleware');
const bodyParser = require('body-parser');
const path = require('node:path')

module.exports = function () {
    const app = express();
    app.rootUrl = '/api'

    // MIDDLEWARE
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'text/plain' }));
    app.use(bodyParser.raw({ type: 'image/*', limit: '5mb'}));

    app.get('/api', function (req, res) {
        res.send({ 'message': 'Hello World!' })
    });

    //ROUTES
    require('../app/routes/users.routes')(app);

    // In production version express app serves react frontend
    app.use(express.static(path.resolve(__dirname, '../build')));

    if (Boolean(process.env.PROD)) {
        app.get('/*', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
        })
    }

    console.log(path.join(__dirname, 'build', 'index.html'))

    return app
};