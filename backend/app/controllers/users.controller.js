const Users = require('../models/users.model');
const { validationResult } = require('express-validator');
const formats = require('../services/formatting');

exports.create = async function(req, res) {
    console.log("Register user req");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (await Users.findByUsername(req.body.username)) {
            return res.status(409).send('Username already in use');
        }
        if (await Users.findByEmail(req.body.email)) {
            return res.status(409).send('Email already in use');
        }
        const newId = await Users.create(req.body);
        return res.status(201).send({newId});
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error' + err);
    }
}


exports.login = async function(req, res) {
    console.log("Login req");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        user = await Users.findByUsername(req.body.username);
        if (!user || req.body.password !== user.password) {
            return res.status(401).send('Invalid username or password'); // Would send 404 for user but less info for security
        }
        loginInfo = await Users.login(req.body.username);
        return res.status(200).json(loginInfo);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error' + err);
    }
}

// TODO: I'm pretty sure I could use the response from the db the first time as profile here
// by setting it as req.profile or something and save 1 request but firebase is so cheap anyway
exports.viewPublic = async function(req, res) {
    console.log("Get user req");
    try {
        const profile = await Users.findByUsername(req.params.username, formats.userPublic); // this line can be optimised (see above)
        if (!profile) {
            res.sendStatus(404);
        } else {
            res.status(200).send(profile);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error' + err);
    }
}

exports.viewPrivate = async function(req, res) {
    console.log("Private get user req");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.params.username != req.authenticatedUsername) {
        return res.sendStatus(403);
    }
    try {
        const profile = await Users.findByUsername(req.params.username, formats.userPrivate); // same optimisation as above
        if (!profile) {
            res.sendStatus(404);
            console.log('Serious issue, logged in user authenticated but not found') // Will never happen right :)
        } else {
            res.status(200).send(profile);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error' + err);
    }
}