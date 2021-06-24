const Users = require('../models/users.model')
const passwords = require('../services/passwords');

exports.create = async function (req, res) {
    console.log("Register user req")
    // Do some validation to protect the website

    try {
        const newId = await Users.create(req.body)
        res.status(201).send({newId})
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error' + err)
    }
}

exports.login = async function (req, res) {
    console.log("Login req")

    try {
        const foundUser = await Users.findByLoginInput(req.body.loginInput)
        if (!foundUser) {
            res.status(400).send("Bad Request: invalid username/email")
        } else {
            const passwordCorrect = await passwords.compare(req.body.password, foundUser.password)
            if (passwordCorrect) {
                const loginResult = await Users.login(foundUser.id);
                res.statusMessage = 'OK';
                res.status(200).json(loginResult);
            } else {
                res.status(400).send("Bad Request: invalid password")
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error' + err)
    }


}