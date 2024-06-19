import express from 'express';
import { env } from 'process';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const mainRoute = require('./routes/index');

const app = express();
const port = env.PORT || 5000;

// Redis connection setup
const redis = new Redis(); // Default connection to 127.0.0.1:6379

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/your-database', {
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use(mainRoute);

// Listen on all network interfaces (0.0.0.0) on port 5000
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
