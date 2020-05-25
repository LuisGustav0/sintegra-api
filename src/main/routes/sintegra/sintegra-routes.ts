import { Router } from 'express'
import { adaptRoute } from '../../adapter/express-route.adapter'
import { makeSintegraResource } from '../../factory/sintegra.factory'

export default (router: Router): void => {
  router.post('/sintegra', adaptRoute(makeSintegraResource()))
}
