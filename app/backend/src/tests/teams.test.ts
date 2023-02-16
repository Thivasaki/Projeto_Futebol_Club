import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes da rota "/teams"', () => {

  let chaiHttpResponse: Response;

  it('Teste para listagem de todos os times', async () => {
    const mockTeams = [
      {
        id: 1,
        teamName: 'Time 1',
      },
      {
        id: 2,
        teamName: 'Time 2',
      }
    ]

    sinon
    .stub(Team, "findAll")
    .resolves(mockTeams as Team[]);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(chaiHttpResponse.status).to.have.equal(200);
  });

  it('Teste para listagem de um time por id', async () => {
    const mockTeams = {
      id: 1,
      teamName: 'Time 1',
    };

    sinon
    .stub(Team, "findByPk")
    .resolves(mockTeams as Team);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')

    expect(chaiHttpResponse.status).to.have.equal(200);
    (Team.findByPk as sinon.SinonStub).restore();
  });

  it('Teste para listagem de um time por id que não existe', async () => {
    sinon
    .stub(Team, "findByPk")
    .resolves();

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/xablau')

    expect(chaiHttpResponse.status).to.have.equal(401);
  });
});

