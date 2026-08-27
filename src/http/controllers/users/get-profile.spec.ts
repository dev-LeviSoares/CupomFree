import request from 'supertest'
import { app } from '../../../app.js';
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createAndAuthenticateUser } from '../../../utils/create-and-authenticate-user.js';

describe('Get Profile (E2E)', () => {
  beforeAll( async () => {
    await app.ready()
  });

  afterAll( async () => {
    await app.close()
  });

  it('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'levisoares@test.com',
      })
    );
  })
})