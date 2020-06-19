const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = adminAuthentication = (req, res, next, err) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : undefined;

    const adminRole = config.get('role.admin');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const { role } = jwt.verify(token, config.get('app.secret'));

    if (role !== adminRole)
      return res.status(405).json({ message: 'Method Not Allowed' });

    next();
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' }).end();
  }
};
