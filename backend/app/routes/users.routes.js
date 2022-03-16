const users = require('../controllers/users.controller.js')
const authenticate = require('../middleware/authenticate.js')
const validate = require('../middleware/validate.js')

module.exports = function(app) {
    const baseUrl = app.rootUrl + '/users';

    app.route(baseUrl + '/register')
        .post(validate.userCreationValidators, users.create);   
    
    app.route(baseUrl + '/login')
        .post(validate.userLoginValidators, users.login);

    app.route(baseUrl + '/:username')
        .get(validate.loginRequiredValidators, authenticate.loginRequired, users.viewPublic);
    
    app.route(baseUrl + '/private/:username')
        .get(validate.loginRequiredValidators, authenticate.loginRequired, validate.userViewValidators, users.viewPrivate);
};