import { MissingParamError } from '../exception/erros/missing-param.error'

import ResponseEntity from '../protocol/response-entity'
import { IHttpRequest, IHttpResponse } from '../protocol'

import SintegraModel from '../domain/model/sintegra.model'

import SearchResourceInterface from '../protocol/search-resource.interface'
import SintegraGoiasService from '../domain/service/sintegra-goias.service'

export default class SintegraResource implements SearchResourceInterface {
  async search (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { documentReceitaFederal } = httpRequest.body

    if (!documentReceitaFederal) {
      return ResponseEntity.notFound(new MissingParamError('CNPJ/CPF'))
    }

    try {
      // const sintegraMatoGrossoService = new SintegraMatoGrossoService()
      // const sintegraMatoGrosso: SintegraModel = await sintegraMatoGrossoService.search(documentReceitaFederal)

      const sintegraGoiasService = new SintegraGoiasService()
      const sintegraGoias: SintegraModel = await sintegraGoiasService.search(documentReceitaFederal)
      return ResponseEntity.ok(sintegraGoias)
    } catch (error) {
      return ResponseEntity.notFound(new Error(`CNPJ: ${documentReceitaFederal} não encontrado!`))
    }
  }
}
