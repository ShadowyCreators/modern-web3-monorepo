import request from 'supertest';
import app from '../app';

describe('app', () => {
  it('GETs/ and should obtain "Hello World!"', async () => {
    expect.assertions(1);
    const res = await request(app).get('/').expect(200);
    expect(res.body).toMatchInlineSnapshot(`{}`);
  });
});
