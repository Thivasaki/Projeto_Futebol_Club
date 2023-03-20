import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota "/matches"', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })


  it('Teste para listagem de todos os times', async () => {
    const mockLeaderboard = [
      {
        id: 16,
        teamName: 'São Paulo',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 0
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 2,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 2,
            awayTeamGoals: 3
          },
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          }
        ]
      },
      {
        id: 9,
        teamName: 'Internacional',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 4
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 1
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 0,
            awayTeamGoals: 2
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 1
          }
        ]
      },
    ]

    sinon
      .stub(Team, "findAll")
      .resolves(mockLeaderboard as any);
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')

       expect(chaiHttpResponse.status).to.have.equal(200);
  })

  it('Teste para listagem de todos os times', async () => {
    const mockLeaderboard = [
      {
        id: 16,
        teamName: 'São Paulo',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 0
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 2,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 2,
            awayTeamGoals: 3
          },
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          }
        ]
      },
      {
        id: 9,
        teamName: 'Internacional',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 4
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 1
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 0,
            awayTeamGoals: 2
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 1
          }
        ]
      },
    ]

    sinon
      .stub(Team, "findAll")
      .resolves(mockLeaderboard as any);
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')

       expect(chaiHttpResponse.status).to.have.equal(200);
  })

  it('Teste para listagem de todos os times', async () => {
    const mockLeaderboard = [
      {
        id: 16,
        teamName: 'São Paulo',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 0
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 2,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 2,
            awayTeamGoals: 3
          },
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          }
        ]
      },
      {
        id: 9,
        teamName: 'Internacional',
        homeMatch: [
          {
            homeTeamGoals: 1,
            awayTeamGoals: 1
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 4
          },
          {
            homeTeamGoals: 3,
            awayTeamGoals: 1
          }
        ],
        awayMatch: [
          {
            homeTeamGoals: 0,
            awayTeamGoals: 2
          },
          {
            homeTeamGoals: 0,
            awayTeamGoals: 1
          }
        ]
      },
    ]

    sinon
      .stub(Team, "findAll")
      .resolves(mockLeaderboard as any);
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away')

       expect(chaiHttpResponse.status).to.have.equal(200);
  })

});
