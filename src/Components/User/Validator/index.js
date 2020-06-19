const Joi = require('@hapi/joi');

module.exports = class UserDataValidation {
  // Data validation rules

  emailRuleValidation = (email) =>
    Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'es', 'org'] },
        })
        .required(),
    }).validateAsync({ email });

  idRuleValidation = (id) =>
    Joi.object({
      id: Joi.string().required(),
    }).validateAsync({ id });

  // Data validation methods

  /**
   * Validate body email property
   *
   * @name GET/user/id/:id
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @return {undefined}
   */
  toCheckEmail = async (req, res, next) => {
    try {
      const { email } = req.body;

      await this.emailRuleValidation(email);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };

  /**
   * Validate params id property
   *
   * @name GET/user/id/:id
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   * @return {undefined}
   */
  toCheckId = async (req, res, next) => {
    try {
      const { userId } = req.params;

      await this.idRuleValidation(userId);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };
};
