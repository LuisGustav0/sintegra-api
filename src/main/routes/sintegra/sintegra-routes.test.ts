import request from 'supertest'
import appConfig from '../../config/app.config'

describe('Sintegra Routes', () => {
  it('Should return document sintegra on SUCCESS', async () => {
    await request(appConfig)
      .post('/api/sintegra')
      .send({
        documentReceitaFederal: '02299715000112'
      })
      .expect(200)
  })
})
