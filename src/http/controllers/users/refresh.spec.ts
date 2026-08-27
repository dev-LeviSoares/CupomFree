import request from 'supertest'
import { app } from '../../../app.js';
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user.js';

describe('Search User (E2E)', () => {
  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it('should be able to refresh a token', async () => {

    await request(app.server).post("/register").send({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    });

    const authResponse = await request(app.server).post("/login").send({
      email: 'levisoares@test.com',
      password: '12345678',
    });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
    .patch('/refresh/token')
    .set('Cookie', cookies!)
    .send()

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})