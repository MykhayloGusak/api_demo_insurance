const UserController = require('../Controller');

module.exports = class UserRoutes {
  constructor() {
    this.UserController = new UserController();
  }

  // Router
  routes(app) {
    app.route('/login').post(this.UserController.login);

    app.route('/user/id/:userId').get();

    app.route('/user/name/:userName').get();
  }
};
