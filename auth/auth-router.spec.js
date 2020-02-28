const req = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig.js');

describe('Auth router', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('Post /api/auth/register', () => {

    it('should add a user to the existing array', async () => {
      await db('users').insert({ username: 'test', password: 'test' })
      const users = await db('users');
      expect(users.length).toBe(1)
    });

    it('should have the right info', async () => {
      const user = await req(server)
        .post("/api/auth/register")
        .send({ username: 'test', password: 'test' });
      // console.log(user.body.user)
      expect(user.body.user).toEqual({ id: 1, username: 'test' })
    });

    it('should have the right status code', async () => {
      const res = await req(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' })
      expect(res.status).toBe(201)
    });

    it('should return a token', async () => {
      const res = await req(server)
        .post("/api/auth/register")
        .send({ username: 'test', password: 'test' });
      // console.log(res)
      expect(res.body.token)
    });
  });

  describe('Post /api/auth/login', () => {

    it('should have the right status code', async () => {
      await req(server)
        .post("/api/auth/register")
        .send({ username: 'test', password: 'test' });

      const res = await req(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: 'test' })
      expect(res.status).toBe(200)
    });

    it('should return a token', async () => {
      await req(server)
        .post("/api/auth/register")
        .send({ username: 'test', password: 'test' });
      const res = await req(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: 'test' })
      // console.log(res.body)
      expect(res.body.token)
    });

    it('should return a message', async () => {
      await req(server)
        .post("/api/auth/register")
        .send({ username: 'test', password: 'test' });
      const res = await req(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: 'test' })
      // console.log(res.text)
      expect(res.body.message).toBe('Welcome test')
    });
  });
});