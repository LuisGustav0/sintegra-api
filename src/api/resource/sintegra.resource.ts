import SintegraRequest from './request/sintegra.request'
import SintegraResponse from './response/sintegra.response'

export class SintegraResource {
  search (httpRequest: SintegraRequest): SintegraResponse {
    if (!httpRequest.body.documentoReceitaFederal) {
      return {
        statusCode: 400,
        body: new Error('Missing param: CNPJ/CPF')
      }
    }
  }
}
