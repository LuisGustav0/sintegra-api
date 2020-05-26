import request from 'supertest'
import appConfig from '../../config/app.config'

describe('Sintegra Routes', () => {
  it('Should return document sintegra on SUCCESS', async (done) => {
    const body = {
      documentReceitaFederal: '02299715000112'
    }

    await request(appConfig)
      .post('/api/sintegra')
      .send(body)
      .expect(200)
      .then(() => done())
  })
})
