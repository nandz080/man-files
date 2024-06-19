const dbClient = require('../utils/db');
const crypto = require('crypto'); // Import crypto for password hashing

const postNew = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password presence
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }

  // Check for existing email
  const existingUser = await dbClient.db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Already exist' });
  }

  // Hash password using SHA1 (consider a more secure algorithm in production)
  const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

  // Create new user document
  const newUser = { email, password: hashedPassword };

  // Insert user in DB
  const insertResult = await dbClient.db.collection('users').insertOne(newUser);

  // Respond with created user (excluding password)
  const createdUser = { id: insertResult.insertedId, email };
  res.status(201).json(createdUser);
};

module.exports = { postNew };
