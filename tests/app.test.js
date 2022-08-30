const app = require('../app');
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/roulette",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  // afterEach((done) => {
  //   mongoose.connection.db.dropDatabase(() => {
  //     mongoose.connection.close(() => done())
  //   });
  // });

  describe('App', () => {
    it('should create a new user', async () => {
      const res = await supertest(app)
        .post('/register')
        .auth()
        .send({
            "first_name":"Sheetal",
            "last_name":"Matey",
            "email":"sheetalmatey07@gmail.com",
            "password":"roulette123"
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('email')
    })
    it('should login with new credentials', async () => {
      const res = await supertest(app)
        .post('/login')
        .send({
            "email":"maheshshebe@gmail.com",
            "password":"roulette789"
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('email')
    })
    it('start betting', async () => {
      const res = await supertest(app)
        .post('/createbet')
        .send({
          "user_id":"630ce75012b9ce92c2759c13",
          "betAmount":"10",
          "betColor":"red",
          "betType":"odd",
          "betNumber":5,
          "winner":5
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('betAmount')
    })
  })