import request from 'supertest'
import { app } from '../../../app.js';
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe('Search User (E2E)', () => {
  beforeAll( async () => {
    await app.ready()

    await request(app.server).post('/register').send({
      cpf: '999.999.999-99',
      email: 'levisoares@test.com',
      name: 'Levi Soares',
      password: '12345678'
    })
  });

  afterAll( async () => {
    await app.close()
  });

  it('should be able to search profile by email', async () => {

    const response = await request(app.server).get('/me').query({
      email: 'levi',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(1)
    expect(response.body.users[0]).toEqual(
      expect.objectContaining({
        email: 'levisoares@test.com',
        name: 'Levi Soares',
      })
    )
  })

  it('should be able to search profile by cpf', async () => {

    const response = await request(app.server).get('/me').query({
      cpf: '999',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(1)
    expect(response.body.users[0]).toEqual(
      expect.objectContaining({
        email: 'levisoares@test.com',
        cpf: '999.999.999-99',
      })
    )
  })

  it('should be able to search profile by name', async () => {

    const response = await request(app.server).get('/me').query({
      name: 'levi',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(1)
    expect(response.body.users[0]).toEqual(
      expect.objectContaining({
        email: 'levisoares@test.com',
        name: 'Levi Soares',
      })
    )
  })
})