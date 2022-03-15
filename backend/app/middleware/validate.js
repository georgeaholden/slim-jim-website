const { body, header, param } = require('express-validator');

exports.userCreationValidators = [
    body('email').notEmpty().isEmail(),
    body('username').notEmpty().isAlphanumeric(),
    body('password').notEmpty().isHash('sha256')
]

exports.userLoginValidators = [
    body('username').notEmpty().isAlphanumeric(),
    body('password').notEmpty().isHash('sha256')
]

exports.loginRequiredValidators = [
    header('username').notEmpty().isAlphanumeric(),
    header('X-Authorization').notEmpty().isAlphanumeric().isLength(32),
    param('username').notEmpty().isAlphanumeric()
]