const UserController = require('../Controller');
const UserDataValidation = require('../Validator');

module.exports = class UserRoutes {
  constructor() {
    this.userController = new UserController();
    this.userDataValidation = new UserDataValidation();
  }

  // Router
  routes(app) {
    app
      .route('/login')
      .post(this.userDataValidation.toCheckEmail, this.userController.login);

    app.route('/id/:userId').get();

    app.route('/name/:userName').get();
  }
};
