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

  it('should be able to search profile by email', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .get('/search-user')
    .query({ q: 'levisoares@', page: 1 })
    .set("Authorization", `Bearer ${token}`)
    .send();

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

    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .get('/search-user').query({ q: '999', page: 1 })
    .set("Authorization", `Bearer ${token}`)
    .send();

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
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .get('/search-user')
    .query({ q: 'Levi Soares', page: 1 })
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(1)
    expect(response.body.users[0]).toEqual(
      expect.objectContaining({
        email: 'levisoares@test.com',
        name: 'Levi Soares',
      })
    )
  })

  it('should be able to search users with pagination', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    for (let i = 1; i <= 22; i++) {
      await request(app.server).post('/register').send({
        name: `Search User ${i}`,
        email: `search${i}@test.com`,
        cpf: `111.111.111-${i}`,
        password: '12345678',
      })
    }

    const response = await request(app.server)
    .get('/search-user')
    .query({ q: 'Search User', page: 2 })
    .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(2)
    expect(response.body.users).toEqual([
      expect.objectContaining({ name: 'Search User 21' }),
      expect.objectContaining({ name: 'Search User 22' }),
    ])
  })
})