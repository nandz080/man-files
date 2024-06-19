import redisClient from '../utils/redis';
import dbClient from '../utils/db';


const AppController = {
    getStatus(req, res) {
        // Replace these with your actual logic to check Redis and database
        const redisStatus = true; // Example Redis status
        const dbStatus = true; // Example DB status
        
        res.status(200).json({ redis: redisStatus, db: dbStatus });
    },

    getStats(req, res) {
        // Replace these with your actual logic to fetch user and file counts
        const usersCount = 4; // Example user count
        const filesCount = 30; // Example file count
        
        res.status(200).json({ users: usersCount, files: filesCount });
    }
};

export default AppController;
