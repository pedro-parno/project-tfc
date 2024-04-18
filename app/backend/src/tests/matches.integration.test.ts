import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/MatchesModel';
import { matchesMock, matchMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

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

  it('should return erro message when missing id on data base.', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/matches/123456789');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Partida não encontrada' });
  })

  it('should return match by its id.', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matchMock as any);

    const { status, body } = await chai.request(app).get('/matches/31');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock);
  })
});
