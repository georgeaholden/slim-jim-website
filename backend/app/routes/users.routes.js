const users = require('../controllers/users.controller.js')

module.exports = function(app) {
    console.log("called")
    const baseUrl = app.rootUrl + '/users';
    console.log(baseUrl)
    app.route(baseUrl + '/register')
        .post(users.create);   
};