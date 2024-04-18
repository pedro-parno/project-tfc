import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/MatchesModel';
import { matchesMock, matchMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNzEzNDI1NzQ2fQ.la3dq5rCbo3-e_FF1zYT3s5EAZAmXVGgABHma2Ch7s8"

describe('Matches integration tests:', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('shouldreturn all matches.', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock)
  })

  it('should return erro message when missing id on data base.', async function () {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/matches/123456789').set('Authorization', token);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Partida não encontrada' });
  })

  it('should return match by its id.', async function () {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matchMock as any);

    const { status, body } = await chai.request(app).get('/matches/31');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock);
  })

  it('should update match status', async function () {
    const updateMatch = { inProgress: false };
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    sinon.stub(SequelizeMatches, 'findByPk').resolves({ ...matchMock[0], ...updateMatch } as any);

    const { status, body } = await chai.request(app).put('/matches/31').send(updateMatch);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ ...matchMock[0], ...updateMatch});
  })
});
