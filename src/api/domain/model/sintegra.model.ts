import InformacaoComplementarModel from './informacao-complementar.model'
import EnderecoModel from './endereco.model'

export default class SintegraModel {
  razaoSocial: string
  fantasia: string
  inscricaoEstadual: string
  cnpj: string
  contribuinte: string
  endereco: EnderecoModel = new EnderecoModel()

  informacaoComplementar: InformacaoComplementarModel = new InformacaoComplementarModel()

  observacao: string
  dataConsulta: string
}
