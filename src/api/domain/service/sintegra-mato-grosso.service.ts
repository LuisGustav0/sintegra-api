import puppeteer from 'puppeteer'
import SintegraModel from '../model/sintegra.model'

const url = 'https://www.sefaz.mt.gov.br/cadastro/emissaocartao/emissaocartaocontribuinteacessodireto'

export default class SintegraMatoGrossoService {
  async search (documentReceitaFederal: string): Promise<SintegraModel> {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitFor(300)
    const selectTypeDocument = await page.$('select[name="codigoTipoDocumento"]')
    await selectTypeDocument.type('CNPJ')

    await page.waitForSelector('input[name="numrDoct"]')

    await page.$eval('input[name=numrDoct]',
      // eslint-disable-next-line no-return-assign
      (el: any, value: any) => el.value = value, documentReceitaFederal)

    await page.$('imagemCaptcha').then(result => console.log(result))

    return null
  }
}
