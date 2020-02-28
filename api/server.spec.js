const req = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('./server.js');

describe('The server', () => {

  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('Get /', () => {
    it('should give back the right status code and message', async () => {
      const res = await req(server).get('/');
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe(`It's working`)
    });
  });
});