const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

const getStatus = async (req, res) => {
  const redisStatus = redisClient.isAlive();
  const dbStatus = dbClient.isAlive();
  res.status(200).json({ redis: redisStatus, db: dbStatus });
};

const getStats = async (req, res) => {
  const userCount = await dbClient.nbUsers();
  const fileCount = await dbClient.nbFiles();
  res.status(200).json({ users: userCount, files: fileCount });
};

module.exports = { getStatus, getStats };
