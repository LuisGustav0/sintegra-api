import request from 'supertest'
import appConfig from '../../config/app.config'

describe('Body parser Middleware', () => {
  it('Should parse body as json', async () => {
    appConfig.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    await request(appConfig)
      .post('/test-body-parser')
      .send({ value: 'Test' })
      .expect({ value: 'Test' })
  })
})
