const app = require('../../Server/app');
const jwt = require('jsonwebtoken');

const { assert } = require('chai');
const faker = require('faker');
const request = require('supertest');
const config = require('config');

describe('GET /user/id/{id} -> ', () => {
  let userRole = config.get('role.user');
  let adminRole = config.get('role.admin');
  let secret = config.get('app.secret');

  describe('check user essential info -> toCheckBodyEssentialInformation()', () => {
    let userId, adminToken, userToken;

    beforeEach(() => {
      userId = 'a0ece5db-cd14-4f21-812f-966633e7be86';

      adminToken = jwt.sign(
        {
          role: adminRole,
        },
        secret,
        {
          expiresIn: '1m',
        }
      );

      userToken = jwt.sign(
        {
          role: userRole,
        },
        secret,
        {
          expiresIn: '1m',
        }
      );
    });
    describe.only('OK Cases', () => {
      describe('Admin Cases', () => {
        it('When admin send the request and user exists, expect to return user data', async () => {
          //Arrange
          let id = userId;
          let token = adminToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 200);
          assert.exists(res.body.token);
        });
      });
      describe('Admin Cases', () => {
        it('When user send the request and user exists, expect to return user data', async () => {
          //Arrange
          let id = userId;
          let token = userToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 200);
          assert.exists(res.body.token);
        });
      });
    });
    describe('ERROR Cases', () => {
      describe('body.email', () => {
        it('When email is an object, expect an Error and status 400', async () => {
          //Arrange
          let body = { email: {} };

          //Act
          const res = await request(app).post('/login').send(body);

          //Assert
          assert.equal(res.status, 400);
          assert.equal(res.body.message, '"email" must be a string');
        });
        it('When email is of type number, expect an Error and status 400', async () => {
          //Arrange
          let body = { email: 23 };

          //Act
          const res = await request(app).post('/login').send(body);

          //Assert
          assert.equal(res.status, 400);
          assert.equal(res.body.message, '"email" must be a string');
        });
        it('When email is of type null, expect an Error and status 400', async () => {
          //Arrange
          let body = { email: null };

          //Act
          const res = await request(app).post('/login').send(body);

          //Assert
          assert.equal(res.status, 400);
          assert.equal(res.body.message, '"email" must be a string');
        });
        it('When email is undefined, expect an Error and status 400', async () => {
          //Arrange
          let body = { email: undefined };

          //Act
          const res = await request(app).post('/login').send(body);

          //Assert
          assert.equal(res.status, 400);
          assert.equal(res.body.message, '"email" is required');
        });
        it('When email has invalid format, expect an Error and status 400', async () => {
          //Arrange
          let body = { email: 'ezart.com' };

          //Act
          const res = await request(app).post('/login').send(body);

          //Assert
          assert.equal(res.status, 400);
          assert.equal(res.body.message, '"email" must be a valid email');
        });
      });
    });
  });
});
