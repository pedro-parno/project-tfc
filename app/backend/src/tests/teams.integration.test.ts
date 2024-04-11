import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/TeamsModel';
import { teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests:', function() {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  })
});
