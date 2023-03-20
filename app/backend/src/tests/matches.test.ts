import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testes da rota "/matches"', () => {
  let chaiHttpResponse: Response;

  it('Teste para listagem de todas as partidas', async () => {
    const mockMatches = [
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
      },
      {
        id: 2,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: true,
      },
    ]

    sinon
      .stub(Match, "findAll")
      .resolves(mockMatches as Match[]);
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')

    expect(chaiHttpResponse.status).to.have.equal(200);
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Teste para listagem de todas as partidas em progresso', async () => {
    const mockMatches = [
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 8,
        awayTeamGoals: 1,
        inProgress: false,
      },
    ]

    sinon
      .stub(Match, "findAll")
      .resolves(mockMatches as Match[]);
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .query({
        inProgress: 'true'
       })

    expect(chaiHttpResponse.status).to.have.equal(200);
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Teste para listagem de todas as partidas finalizadas', async () => {
    const mockMatches = [
      {
        id: 1,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: true,
      },
    ]

    sinon
      .stub(Match, "findAll")
      .resolves(mockMatches as Match[]);
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .query({
        inProgress: 'false'
       })

    expect(chaiHttpResponse.status).to.have.equal(200);
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Teste para salvar uma partida', async () => {
    const mockMatches = {
        id: 1,
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
        inProgress: true,
      };
    const mockBody = {
        homeTeamId: 9,
        homeTeamGoals: 1,
        awayTeamId: 14,
        awayTeamGoals: 1,
      };
    const userToken = {
        data: {
        role: 'admin',
        email: 'admin@admin.com',
      }
    };

    sinon
      .stub(jwt, 'verify')
      .resolves(userToken);
    sinon
      .stub(Match, 'findByPk')
      .resolves();
    sinon
      .stub(Match, 'create')
      .resolves(mockMatches as Match);
    chaiHttpResponse = await chai
       .request(app)
       .post('/matches')
       .set('authorization', 'a')
       .send(mockBody);
      
    expect(chaiHttpResponse.status).to.have.equal(201);
    (jwt.verify as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
  })

});
