const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = userAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : undefined;

    const adminRole = config.get('role.admin');
    const userRole = config.get('role.user');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const { role } = jwt.verify(token, config.get('app.secret'));

    if (role !== adminRole && role !== userRole)
      return res.status(405).json({ message: 'Method Not Allowed' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' }).end();
  }
};
