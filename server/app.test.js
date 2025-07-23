const request = require('supertest');
const app = require('./app');

describe('Minesweeper API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /get-scores', () => {
    it('should return scores array', async () => {
      const response = await request(app)
        .get('/get-scores')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /post-score', () => {
    it('should accept valid score', async () => {
      const scoreData = {
        name: 'TestPlayer',
        score: 120
      };

      const response = await request(app)
        .post('/post-score')
        .send(scoreData)
        .expect(200);
      
      expect(response.body.success).toBe(true);
    });

    it('should reject invalid name', async () => {
      const scoreData = {
        name: '',
        score: 120
      };

      await request(app)
        .post('/post-score')
        .send(scoreData)
        .expect(400);
    });

    it('should reject invalid score', async () => {
      const scoreData = {
        name: 'TestPlayer',
        score: -1
      };

      await request(app)
        .post('/post-score')
        .send(scoreData)
        .expect(400);
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      await request(app)
        .get('/unknown-route')
        .expect(404);
    });
  });
});
