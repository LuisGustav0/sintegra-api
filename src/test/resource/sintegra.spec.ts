import { expect } from 'chai'
import 'mocha'

import { SintegraResource } from '../../api/resource/sintegra.resource'

describe('Sintegra Resource', () => {
  it('Should return 400 if no CNPJ/CPF is provided', () => {
    const sintegraResource = new SintegraResource()

    const httpRequest = { body: {} }

    const httpResponse = sintegraResource.search(httpRequest)

    expect(httpResponse.statusCode).to.equal(400)
  })
})
