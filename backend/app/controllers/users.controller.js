const Users = require('../models/users.model')

exports.create = async function (req, res) {
    // Do some validation to protect the website

    try {
        const newId = await Users.create(req.body)
        res.status(201).send({newId})
    } catch (err) {
        res.status(500).send('Internal Server Error' + err)
    }
}