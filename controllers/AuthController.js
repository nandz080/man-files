const User = require('../models/User'); // Assuming a User model exists
const basicAuth = require('express-basic-auth');
const { v4: uuidv4 } = require('uuid');
const redisClient = require('../utils/redisClient'); // If using Redis

const authController = {};

authController.getConnect = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Basic ')) {
    return res.status(400).json({ error: 'Missing authorization header' });
  }

  const [email, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');

  try {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) { // Assuming a comparePassword method on User
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = uuidv4();
    const key = `auth_${token}`;
    await redisClient.set(key, user._id, 'EX', 3600); // Set token with user ID for 1 hour (3600 seconds)

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

authController.getDisconnect = async (req, res) => {
  const token = req.headers['x-token'];

  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  const key = `auth_${token}`;
  try {
    await redisClient.del(key);
    return res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authController;
