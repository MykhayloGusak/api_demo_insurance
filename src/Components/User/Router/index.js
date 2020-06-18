module.exports = class UserRoutes {
  // Router
  routes(app) {
    app.route('/login').post();

    app.route('/user/id/:userId').get();

    app.route('/user/name/:userName').get();
  }
};
