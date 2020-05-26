import puppeteer from 'puppeteer'
import SintegraModel from '../model/sintegra.model'
import EnderecoModel from '../model/endereco.model'
import AtividadeEconomicaModel from '../model/atividade-economica.model'
import InformacaoComplementarModel from '../model/informacao-complementar.model'

const tabletojson = require('tabletojson').Tabletojson
const urlGO = 'http://appasp.sefaz.go.gov.br/Sintegra/Consulta/default.asp?'
const returnUrlGO = 'http://appasp.sefaz.go.gov.br/Sintegra/Consulta/consultar.asp'

const convertTableToJson = (table: string): string => {
  table = table.split('\t').join('')
  table = table.split('\n').join('')
  return tabletojson.convert(table)
}

export default class SintegraGoiasService {
  async search (documentReceitaFederal: string): Promise<SintegraModel> {
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

    await pageReturn.waitFor(500)
    const data = await pageReturn.$$eval('center', listTable => listTable.map(table => table.innerHTML))

    const listTableJSON = data.map(convertTableToJson)

    const razaoSocial = listTableJSON['1']['0']['8'] ? listTableJSON['1']['0']['8']['0'] : ''
    const fantasia = listTableJSON['1']['0']['18'] ? listTableJSON['1']['0']['18']['0'] : ''
    const contribuinte = listTableJSON['1']['0']['13'] ? listTableJSON['1']['0']['13']['0'] : ''

    let cnpj = listTableJSON['1']['0']['3'] ? listTableJSON['1']['0']['3']['0'] : ''
    cnpj = cnpj.replace('CNPJ:', '')
    cnpj = cnpj.trim()

    let inscricaoEstadual = listTableJSON['1']['0']['3']['1']
    inscricaoEstadual = inscricaoEstadual.replace('Inscrição Estadual - CCE :', '')
    inscricaoEstadual = inscricaoEstadual.trim()

    let cep = listTableJSON['3']['0']['3'] ? listTableJSON['3']['0']['3']['0'] : ''
    cep = cep.replace('CEP:', '')
    cep = cep.trim()

    let logradouro = listTableJSON['2']['0']['3']['0']
    logradouro = logradouro.replace('Logradouro:', '')
    logradouro = logradouro.trim()

    let bairro = listTableJSON['2']['0']['8']['0']
    bairro = bairro.replace('Bairro:', '')
    bairro = bairro.trim()

    let numero = listTableJSON['2']['0']['5']['1']
    numero = numero.replace('Número:', '')
    numero = numero.trim()

    let quadra = listTableJSON['2']['0']['5']['2']
    quadra = quadra.replace('Quadra:', '')
    quadra = quadra.trim()

    let lote = listTableJSON['2']['0']['5']['3']
    lote = lote.replace('Lote:', '')
    lote = lote.trim()

    let complemento = listTableJSON['2']['0']['5']['4']
    complemento = complemento.replace('Complemento:', '')
    complemento = complemento.trim()

    let municipio = listTableJSON['3']['0']['1']['0']
    municipio = municipio.replace('Município:', '')
    municipio = municipio.trim()

    let uf = listTableJSON['3']['0']['1']['1']
    uf = uf.replace('UF:', '')
    uf = uf.trim()

    let regimeApuracao = listTableJSON['4']['0']['15'] ? listTableJSON['4']['0']['15']['0'] : ''
    regimeApuracao = regimeApuracao.replace('Regime de Apuração:', '')
    regimeApuracao = regimeApuracao.trim()

    let situacaoCadastralVigente = listTableJSON['4']['0']['18'] ? listTableJSON['4']['0']['18']['0'] : ''
    situacaoCadastralVigente = situacaoCadastralVigente.replace('Situação Cadastral Vigente:', '')
    situacaoCadastralVigente = situacaoCadastralVigente.trim()

    let dataDestaSituacaoCadastral = listTableJSON['4']['0']['20']['1']
    dataDestaSituacaoCadastral = dataDestaSituacaoCadastral.replace('Data desta Situação Cadastral:', '')
    dataDestaSituacaoCadastral = dataDestaSituacaoCadastral.trim()

    let dataCadastramento = listTableJSON['4']['0']['20']['2']
    dataCadastramento = dataCadastramento.replace('Data de Cadastramento:', '')
    dataCadastramento = dataCadastramento.trim()

    let operacaoComNfe = listTableJSON['4']['1']['2']['0']
    operacaoComNfe = operacaoComNfe.replace('Operações com NF-E:', '')
    operacaoComNfe = operacaoComNfe.trim()

    let observacao = listTableJSON['5']['0']['2']['0']
    observacao = observacao.replace('Observações:', '')
    observacao = observacao.trim()

    let dataConsulta = listTableJSON['5']['0']['4']['0']
    dataConsulta = dataConsulta.replace('Data da Consulta:', '')
    dataConsulta = dataConsulta.trim()

    const strAtividadeEconomica: string = listTableJSON['4']['0']['3']['0']

    const beginAtividadePrincipal: number = strAtividadeEconomica.indexOf('Atividade Principal') + 19
    const endAtividadePrincipal: number = strAtividadeEconomica.indexOf('Atividade Secundária')
    let atividadePrincipal = strAtividadeEconomica.substring(beginAtividadePrincipal, endAtividadePrincipal)
    atividadePrincipal = atividadePrincipal.trim()

    const beginAtividadeSegundaria: number = strAtividadeEconomica.indexOf('Atividade Principal') + 20
    const endAtividadeSecundaria: number = strAtividadeEconomica.length
    const atividadeSecundaria = strAtividadeEconomica.substring(beginAtividadeSegundaria, endAtividadeSecundaria)

    await pageReturn.pdf({ path: `C:/sintegra/${razaoSocial}_${documentReceitaFederal}.pdf`, format: 'A4' })

    const sintegra: SintegraModel = new SintegraModel()
    sintegra.razaoSocial = razaoSocial
    sintegra.fantasia = fantasia
    sintegra.cnpj = cnpj
    sintegra.inscricaoEstadual = inscricaoEstadual
    sintegra.contribuinte = contribuinte

    const endereco: EnderecoModel = new EnderecoModel()
    endereco.cep = cep
    endereco.logradouro = logradouro
    endereco.numero = numero
    endereco.quadra = quadra
    endereco.lote = lote
    endereco.complemento = complemento
    endereco.bairro = bairro
    endereco.municipio = municipio
    endereco.uf = uf
    sintegra.endereco = endereco

    const atividadeEconomica = new AtividadeEconomicaModel()
    atividadeEconomica.atividadePrincipal = atividadePrincipal
    atividadeEconomica.atividadeSecundaria = atividadeSecundaria

    const informacaoComplementar = new InformacaoComplementarModel()
    informacaoComplementar.atividadeEconomica = atividadeEconomica
    sintegra.informacaoComplementar = informacaoComplementar
    sintegra.informacaoComplementar.regimeApuracao = regimeApuracao
    sintegra.informacaoComplementar.situacaoCadastralVigente = situacaoCadastralVigente
    sintegra.informacaoComplementar.dataDestaSituacaoCadastral = dataDestaSituacaoCadastral
    sintegra.informacaoComplementar.dataCadastramento = dataCadastramento
    sintegra.informacaoComplementar.operacaoComNfe = operacaoComNfe

    sintegra.observacao = observacao
    sintegra.dataConsulta = dataConsulta

    return sintegra
  }
}
