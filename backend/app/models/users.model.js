const db = require('../../config/db');
const passwords = require('../services/passwords'); // Should implement the double hashing thing for security
const randtoken = require('rand-token');
const formats = require('../services/formatting');

exports.create = async function (user) {
    entry = {
        email: user.email,
        password: user.password,
    }
    await db.collection('users').doc(user.username).set(entry);
}

exports.login = async function (username) {
    const token = randtoken.generate(32);
    await db.collection('users').doc(username).update(
        {authToken: token})
    return {"username": username, "token": token};
}

exports.findByUsername = async function (username, formatFunction=formats.userSensitive) {
    const doc = await db.collection('users').doc(username).get();
    if (doc.exists) {
        return formatFunction(doc);
    } else {
        return null;
    }
}

exports.findByEmail = async function (email, formatFunction=formats.userSensitive) {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (!snapshot.empty) {
        return formatFunction(snapshot.docs[0]);
    } else {
        return null;
    }
}  