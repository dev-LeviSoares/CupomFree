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
    .query({ email: 'levi' })
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
    .get('/search-user').query({ cpf: '999' })
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
    .query({ name: 'levi' })
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
})