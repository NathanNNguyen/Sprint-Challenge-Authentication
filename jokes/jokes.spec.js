const req = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');
const Users = require('../database/model.js');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
};

describe('The jokes', () => {
  describe('Get / ', () => {
    it('should return the right status code', async () => {
      const res = await req(server).get('/api/jokes');
      // console.log(res.status)
      expect(res.status).toBe(401)
    });

    it('should have a token', async () => {
      const userData = { username: 'test', password: 'test' }
      const res = await req(server)
        .post('/api/auth/register')
        .send(userData)
      const user = await db('users').where({id: 1})
      const token = generateToken(user)
      expect(token).toBe(token)
      console.log(res.status)
      expect(res.status).toBe(201)
    })
  });
});