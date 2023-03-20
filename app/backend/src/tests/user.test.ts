import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

const { expect } = chai;
chai.use(chaiHttp);

const mockUser = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
}

describe('Testes da rota "/login"', () => {

  let chaiHttpResponse: Response;

  beforeEach( async() => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);
  })

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Teste para testar login feito com sucesso', async () => {
    const mockLogin = {
      email: 'user@user.com',
      password: 'secret_user',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(200);
  });

  it('Teste para testar login feito com senha errada', async () => {
    const mockLogin = {
      email: 'user@user.com',
      password: 'potato',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(401);
  });

  it('Teste para testar login feito com email errada', async () => {

    const mockLogin = {
      email: 'qwdqwd',
      password: 'secret_user',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(401);
  });

  it('Teste para testar login feito sem senha', async () => {
    const mockLogin = {
      email: 'user@user.com',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(400);
  });

  it('Teste para testar login feito sem email', async () => {
    const mockLogin = {
      password: 'potato',
    }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.equal(400);
  });

  it('Teste para falha de autenticação de login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')

    expect(chaiHttpResponse.status).to.have.equal(401);
  });

  it('Teste para autenticação de validação de login', async () => {
    const userToken = {
      data: {
      role: 'user',
      email: 'user@user.com',
    }
  }
    sinon
      .stub(jwt, "verify")
      .resolves(userToken);

    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', 'anytoken')

    expect(chaiHttpResponse.status).to.have.equal(200);
  });
});
