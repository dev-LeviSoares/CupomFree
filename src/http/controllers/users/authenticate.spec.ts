import request from 'supertest'
import { app } from '../../../app.js';
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe('Authenticate (E2E)', () => {
  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it('should be able to authenticate', async () => {
    await request(app.server).post('/register').send({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    })

    const response = await request(app.server).post('/login').send({
      email: 'levisoares@test.com',
      password: '12345678'
    })

    expect(response.statusCode).toEqual(200);
  })
})