const axios = require('axios');
const config = require('config');
debugger;
module.exports = class UserService {
  constructor() {
    this.User = config.get('db.user.url');
    this.Policy = config.get('db.user.url');
  }

  findByEmail = (email) =>
    new Promise(async (resolve, reject) => {
      try {
        debugger;
        const {
          data: { clients },
        } = await axios.get(this.User);

        const index = clients.findIndex((client) => client.email === email);

        if (index < 0) throw Error('User Not Found');

        resolve({ user: clients[index] });
      } catch (err) {
        console.warn(err);
        reject(err);
      }
    });
};
