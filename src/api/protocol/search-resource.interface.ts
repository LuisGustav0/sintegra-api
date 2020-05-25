import { IHttpRequest } from './http-request..interface'
import { IHttpResponse } from './http-response..interface'

export default interface SearchResourceInterface {
  search (httpRequest: IHttpRequest): Promise<IHttpResponse>
}
