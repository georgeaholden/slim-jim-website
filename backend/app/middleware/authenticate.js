const db = require('../../config/db');
const Users = require('../models/users.model')
const { validationResult } = require('express-validator');

exports.loginRequired = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const token = req.header('X-Authorization');
    const username = req.header('username');
    try {
        const result = await Users.findByUsername(username);
        if (!result) {
            return res.sendStatus(401);
        }
        if (token !== result.authToken) {
            return res.sendStatus(401);
        } else {
            req.authenticatedUsername = username;
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error' + err);
    }
}