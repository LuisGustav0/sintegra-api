import SearchResourceInterface from '../../api/protocol/search-resource.interface'

import { Request, Response } from 'express'
import { IHttpRequest, IHttpResponse } from '../../api/protocol'

export const adaptRoute = (resource: SearchResourceInterface) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    const httpResponse: IHttpResponse = await resource.search(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
