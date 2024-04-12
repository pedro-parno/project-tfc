import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUsers from '../database/models/UsersModel';
import LoginService from '../services/login.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login integration tests:', function () {
  this.beforeEach(function () {
    sinon.restore();
  });

  it('should return an error with empty email', async function () {
    const res = await chai.request(app).post('/login').send({ password: 'password' });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('All fields must be filled');
  });

  it('should return an error with empty password', async function () {
    const res = await chai.request(app).post('/login').send({ email: 'email@email.com' });

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('All fields must be filled');
  });

  it('should return an error with wrong email', async function () {
    const res = await chai.request(app).post('/login').send({ email: 'wrong@email.com', password: 'password' });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid email or password');
  });

  it('should return an error with wrong password', async function () {
    const res = await chai.request(app).post('/login').send({ email: 'email@email.com', password: 'wrong_password' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid email or password');
  });

  it('should return a token and success response', async function () {
    const res = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(res.status).to.equal(200);
    expect(res.body.token).to.be.a('string');
  });
});

