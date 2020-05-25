import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

export default (appConfig: Express): void => {
  appConfig.use(bodyParser)
  appConfig.use(cors)
  appConfig.use(contentType)
}
