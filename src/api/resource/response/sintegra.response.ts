import { IHttpResponse } from '../../protocol'

export default class SintegraResponse implements IHttpResponse {
  statusCode: number
  body: any
}
