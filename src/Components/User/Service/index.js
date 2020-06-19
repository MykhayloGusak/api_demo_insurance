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
   * @return {object} User's information
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

  /**
   * Find user by id
   *
   * @param  {string} id User's id
   * @return {object} User's information
   */
  findByid = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          data: { clients },
        } = await axios.get(this.User);

        const index = clients.findIndex((client) => client.id === id);

        if (index < 0) throw new NotFoundError('User Not Found');

        resolve({ user: clients[index] });
      } catch (err) {
        reject(err);
      }
    });
};
