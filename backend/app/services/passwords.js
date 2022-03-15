const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

exports.hash = async function (password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

exports.compare = async function (password, hash) {
    return await bcrypt.compare(password, hash)
}