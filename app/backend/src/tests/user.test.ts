import * as sinon from 'sinon';
import * as chai from 'chai';
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

  // after(()=>{
  //   (User.findOne as sinon.SinonStub).restore();
  // })

  it('Teste para testar login feito com sucesso', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockUser as User);

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

  // it('Teste para testar login feito com senha errada', async () => {
  //   const mockLogin = {
  //     email: 'user@user.com',
  //     password: 'potato',
  //   }

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/login')
  //      .send(mockLogin)

  //   expect(chaiHttpResponse.status).to.have.equal(401);
  // });

  // it('Teste para testar login feito com email errada', async () => {
  //   const mockLogin = {
  //     email: 'potato',
  //     password: 'secret_user',
  //   }

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/login')
  //      .send(mockLogin)

  //   expect(chaiHttpResponse.status).to.have.equal(401);
  // });

  // it('Teste para testar login feito sem senha', async () => {
  //   const mockLogin = {
  //     email: 'user@user.com',
  //   }

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/login')
  //      .send(mockLogin)

  //   expect(chaiHttpResponse.status).to.have.equal(400);
  // });

  // it('Teste para testar login feito sem email', async () => {
  //   const mockLogin = {
  //     password: 'potato',
  //   }

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .post('/login')
  //      .send(mockLogin)

  //   expect(chaiHttpResponse.status).to.have.equal(400);
  // });

  // it('Teste para falha de autenticação de login', async () => {
  //   const mockLogin = {
  //     password: 'potato',
  //   }

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .get('/login/validate')

  //   expect(chaiHttpResponse.status).to.have.equal(401);
  // });

  // it('Teste para falha de autenticação de login', async () => {
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'

  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .get('/login/validate')
  //      .set('Authorization', token)

  //   expect(chaiHttpResponse.status).to.have.equal(200);
  // });
});
