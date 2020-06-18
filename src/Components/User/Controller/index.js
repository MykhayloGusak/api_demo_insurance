const UserService = require('../Service');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
  constructor() {
    this.userService = new UserService();
  }

  /**
   * User authentication
   *
   * @name GET/login
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @return {undefined}
   */
  login = async (req, res, next) => {
    try {
      const { email } = req.body;
      const { user } = await this.userService.findByEmail(email);

      const token = jwt.sign(
        {
          role: user.role,
        },
        config.get('app.secret')
      );

      res.status(200).json({ token });
    } catch (err) {
      console.warn(err);
      next(err);
    }
  };
};
