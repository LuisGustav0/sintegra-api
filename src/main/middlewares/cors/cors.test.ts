import request from 'supertest'
import appConfig from '../../config/app.config'

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    appConfig.get('/test-cors', (req, res) => {
      res.send()
    })

    await request(appConfig)
      .get('/test-body-parser')
      .expect('access-control-allow-origin', '*')
  })
})
