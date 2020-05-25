import { assert, expect } from 'chai'
import 'mocha'

import { MissingParamError } from '../../api/exception/erros/missing-param.error'

import { makeSintegraResource } from '../../main/factory/sintegra.factory'
import { IHttpRequest, IHttpResponse } from '../../api/protocol'

describe('Sintegra Resource', () => {
  it('Should return 400 if no CNPJ/CPF is provided', () => {
    const sintegraResource = makeSintegraResource()
    const httpRequest: IHttpRequest = { body: {} }
    const httpResponse: IHttpResponse = sintegraResource.search(httpRequest)

    expect(httpResponse.statusCode).to.equal(400)
    assert.instanceOf(httpResponse.body, MissingParamError)
    expect(httpResponse.body.message).to.equal(new MissingParamError('CNPJ/CPF').message)
  })
})
