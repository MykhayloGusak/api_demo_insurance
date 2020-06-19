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

  // Data validation methods

  toCheckEmail = async (req, res, next) => {
    try {
      const { email } = req.body;

      await this.emailRuleValidation(email);

      next();
    } catch (err) {
      res.status(400).json({ message: err.message }).end();
    }
  };
};
