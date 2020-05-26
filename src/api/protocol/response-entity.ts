import HttpStatus from './http-status'
import { IHttpResponse } from './http-response..interface'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ResponseEntity {
  static notFound (error: Error): IHttpResponse {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: error
    }
  }

  static ok = (data: any): IHttpResponse => ({
    statusCode: HttpStatus.OK,
    body: data
  })

  static internalServerError = (): IHttpResponse => ({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    body: 'Internal Server Error'
  })
}
