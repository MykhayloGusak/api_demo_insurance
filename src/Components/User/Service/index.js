const axios = require('axios');
const config = require('config');
const { NotFoundError } = require('../../..//Server/errors');

module.exports = class UserService {
  User;
  Policy;

  constructor() {
    this.User = config.get('db.user.url');
    this.Policy = config.get('db.user.url');
  }
  /**
   * Find user by email
   *
   * @param  {string} email User's email
   * @return {object} Information about user
   */
  findByEmail = (email) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          data: { clients },
        } = await axios.get(this.User);

        const index = clients.findIndex((client) => client.email === email);

        if (index < 0) throw new NotFoundError('User Not Found');

        resolve({ user: clients[index] });
      } catch (err) {
        reject(err);
      }
    });
};
