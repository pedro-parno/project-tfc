import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeams from '../database/models/TeamsModel';
import { teamMock, teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests:', function() {
  it('should return all teams.', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teamsMock as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  })

  it('should return erro message when missing id on db', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/123456789');

    expect(status).to.equal(404);
    expect(body).to.deep.equal('Time não encontrado');
  })

  it('should return team by its id.', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teamMock as any);

    const { status, body } = await chai.request(app).get('/teams/8');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock);
  })
});
