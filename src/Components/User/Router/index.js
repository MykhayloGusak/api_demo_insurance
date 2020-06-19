// business logic layer
const UserController = require('../Controller');

// data validator
const UserDataValidation = require('../Validator');

// middleware
const userAuthentication = require('../../../Middleware/userAuthentication');
const {
  adminAuthentication,
} = require('../../../Middleware/adminAuthentication');

module.exports = class UserRoutes {
  constructor() {
    this.userController = new UserController();
    this.userDataValidation = new UserDataValidation();
    this.userSessionAuthentication = userAuthentication;
    this.adminSessionAuthentication = adminAuthentication;
  }

  // Router
  routes(app) {
    app
      .route('/login')
      .post(this.userDataValidation.toCheckEmail, this.userController.login);

    app
      .route('/user/id/:userId')
      .get(
        this.userSessionAuthentication,
        this.userDataValidation.toCheckId,
        this.userController.getUserById
      );

    app.route('/user/name/:userName').get();
  }
};
