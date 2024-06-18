import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(request, response) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ redis: redisStatus, db: dbStatus }).end();
  }

  static async getStats(request, response) {
    const usersNb = await dbClient.nbUsers();
    const filesNb = await dbClient.nbFiles();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ usersNb, filesNb }).end();
  }
}

export default AppController;
