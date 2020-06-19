const UserService = require('../Service');
const config = require('config');
const jwt = require('jsonwebtoken');

const { NotFoundError } = require('../../..//Server/errors');

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
      const {
        user: { role },
      } = await this.userService.findByEmail(email);

      const token = jwt.sign(
        {
          role,
        },
        config.get('app.secret')
      );

      res.status(200).json({ token });
    } catch (err) {
      console.warn(err);
      next(err);
    }
  };

  /**
   * Read user information by ID
   *
   * @name GET/user/id/:id
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @return {undefined}
   */
  getUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { user } = await this.userService.findByid(userId);

      res.status(200).json(user);
    } catch (err) {
      console.warn(err);
      next(err);
    }
  };
};
