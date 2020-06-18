// server config
const app = require('./Server/app');

(async () => {
  console.log(`app running on port ${app.get('port')}`);
  await app.listen(app.get('port'));
})();
