import { MissingParamError } from '../exception/erros/missing-param.error'

import SintegraModel from '../domain/model/sintegra.model'

import ResponseEntity from '../protocol/response-entity'
import { IHttpRequest, IHttpResponse } from '../protocol'

import SearchResourceInterface from '../protocol/search-resource.interface'

import puppeteer from 'puppeteer'
const tabletojson = require('tabletojson').Tabletojson

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const convertTableToJson = (table) => {
  table = table.split('\t').join('')
  table = table.split('\n').join('')
  return tabletojson.convert(table)
}

export default class SintegraResource implements SearchResourceInterface {
  async search (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { documentReceitaFederal } = httpRequest.body

    if (!documentReceitaFederal) {
      return ResponseEntity.notFound(new MissingParamError('CNPJ/CPF'))
    }

    const urlGO = 'http://appasp.sefaz.go.gov.br/Sintegra/Consulta/default.asp?'
    const returnUrlGO = 'http://appasp.sefaz.go.gov.br/Sintegra/Consulta/consultar.asp'

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(urlGO)
    await page.waitFor(300)
    await page.click('input#rTipoDocCNPJ')
    await page.waitFor(300)
    await page.type('input#tCNPJ', documentReceitaFederal)
    await page.waitFor(300)
    await page.click('input[type="submit"]')
    await page.waitFor(300)

    const newWindowTarget = await browser.waitForTarget(target => target.url() === returnUrlGO)
    const pageReturn = await newWindowTarget.page()
    await pageReturn.waitFor(1000)

    const data = await pageReturn.$$eval('center', listTable => listTable.map(table => table.innerHTML))

    const listTableJSON = data.map(convertTableToJson)

    const razaoSocial = listTableJSON['1']['0']['8']['0']
    const fantasia = listTableJSON['1']['0']['18'] ? listTableJSON['1']['0']['18']['0'] : ''
    let inscricaoEstadual = listTableJSON['1']['0']['3']['1']
    inscricaoEstadual = inscricaoEstadual.replace('Inscrição Estadual - CCE :', '')
    inscricaoEstadual = inscricaoEstadual.trim()

    const sintegra: SintegraModel = new SintegraModel()
    sintegra.razaosocial = razaoSocial
    sintegra.fantasia = fantasia
    sintegra.inscricaoEstadual = inscricaoEstadual
    sintegra.documentoReceitaFederal = documentReceitaFederal

    return ResponseEntity.ok(sintegra)
  }
}
