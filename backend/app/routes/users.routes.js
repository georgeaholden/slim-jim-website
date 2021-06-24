const users = require('../controllers/users.controller.js')

module.exports = function(app) {
    const baseUrl = app.rootUrl + '/users';

    app.route(baseUrl + '/register')
        .post(users.create);   
    
    app.route(baseUrl + '/login')
        .post(users.login);
};