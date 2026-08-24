import request from 'supertest'
import { app } from '../../../app.js';
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe('Register (E2E)', () => {
  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/register').send({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    })

    expect(response.statusCode).toEqual(201);
  })
})