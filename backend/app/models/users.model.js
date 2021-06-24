const db = require('../../config/db');
const passwords = require('../services/passwords');
const randtoken = require('rand-token');
const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.create = async function (user) {
    const sql = 'INSERT INTO `User` (username, password, email) VALUES (?, ?, ?)';
    const userData = [user.username, await passwords.hash(user.password), user.email];
    console.log(userData)

    try {
        const result = await db.getPool().query(sql, userData);
        console.log(result);
        return result[0].insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.login = async function (userId) {
    const sql = 'UPDATE `User` SET `auth_token` = ? WHERE `id` = ?';
    const token = randtoken.generate(32);

    try {
        await db.getPool().query(sql, [token, userId]);
        return {"userId": userId, "token": token}
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.findByLoginInput = async function (input) {
    if (EmailRegex.test(input)) {
        return await this.findByEmail(input)
    } else {
        return await this.findByUsername(input)
    }
}


exports.findByUsername = async function (username) {
    const sql = 'SELECT * FROM `User` WHERE `username` = ?';
    
    try {
        result = await db.getPool().query(sql, username)
        return result[0][0]
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.findByEmail = async function (email) {
    const sql = 'SELECT * FROM `User` WHERE `email` = ?';
    
    try {
        result = await db.getPool().query(sql, email)
        return result[0][0]
    } catch (err) {
        console.log(err);
        throw err;
    }
}