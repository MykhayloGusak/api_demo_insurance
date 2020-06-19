const UserRoutes = require('../Components/User/Router');

module.exports = class Routes {
  userRoutes;

  constructor(app) {
    this.userRoutes = new UserRoutes(app);
  }

  routes(app) {
    app.route('/user', this.userRoutes);
  }
};
