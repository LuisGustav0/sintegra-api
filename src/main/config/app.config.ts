import express from 'express'

import setMiddlewareConfig from './middlewares.config'
import setRouteConfig from './routes.config'

const appConfig = express()
setMiddlewareConfig(appConfig)
setRouteConfig(appConfig)
export default appConfig
