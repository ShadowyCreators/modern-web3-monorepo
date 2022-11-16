import request from 'supertest'
import app from '../app'
import { expect } from 'chai'

describe('app', () => {
  it('GETs/ and should obtain "Hello World!"', async () => {
    const res = await request(app).get('/').expect(200)
    expect(res.text).equal('Hello World!')
  })
})
