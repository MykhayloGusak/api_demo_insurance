const app = require('../../Server/app');
const jwt = require('jsonwebtoken');

const { assert } = require('chai');
const request = require('supertest');
const config = require('config');

describe('GET /user/id/{id} -> ', () => {
  let userRole = config.get('role.user');
  let adminRole = config.get('role.admin');
  let secret = config.get('app.secret');

  describe('check user essential info -> toCheckBodyEssentialInformation()', () => {
    let userId, existingUser, adminToken, userToken, invalidToken;

    beforeEach(() => {
      existingUser = {
        id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
        name: 'Britney',
        email: 'britneyblankenship@quotezart.com',
        role: 'admin',
      };

      adminToken = jwt.sign(
        {
          role: adminRole,
        },
        secret,
        {
          expiresIn: '1m',
        }
      );

      invalidToken = jwt.sign(
        {
          role: undefined,
        },
        'invalid secret',
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
    describe('OK Cases', () => {
      describe('Admin Cases', () => {
        it('When admin send the request and user exists, expect to return user data', async () => {
          //Arrange
          let id = existingUser.id;
          let token = adminToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, existingUser);
        });
      });
      describe('Admin Cases', () => {
        it('When user send the request and user exists, expect to return user data', async () => {
          //Arrange
          let id = existingUser.id;
          let token = userToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, existingUser);
        });
      });
    });
    describe('ERROR Cases', () => {
      describe('Unauthorized Cases', () => {
        it('When token is invalid, expect an Error and status 401', async () => {
          //Arrange
          let id = userId;
          let token = invalidToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 401);
          assert.equal(res.body.message, 'Unauthorized');
        });
        it('When token is undefined, expect an Error and status 401', async () => {
          //Arrange
          let id = userId;
          let token = invalidToken;

          //Act
          const res = await request(app).get('/user/id/' + id);

          //Assert
          assert.equal(res.status, 401);
          assert.equal(res.body.message, 'Unauthorized');
        });
      });
      describe('Not Found cases with authorized user', () => {
        it('When admin makes request and user is not found, expect an Error and status 404', async () => {
          //Arrange
          let id = '123';
          let token = adminToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Not Found');
        });
        it('When user makes request and user is not found, expect an Error and status 404', async () => {
          //Arrange
          let id = '123';
          let token = userToken;

          //Act
          const res = await request(app)
            .get('/user/id/' + id)
            .set('Authorization', 'Bearer ' + token);

          //Assert
          assert.equal(res.status, 404);
          assert.equal(res.body.message, 'Not Found');
        });
      });
    });
  });
});
