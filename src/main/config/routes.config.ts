import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (appConfig: Express): void => {
  const router: Router = Router()
  appConfig.use('/api', router)

  fg.sync('**/src/main/routes/**/**routes.ts')
    .map(async file => (await import(`../../../${file}`)).default(router))
}
