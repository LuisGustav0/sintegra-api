import AtividadeEconomicaModel from './atividade-economica.model'

export default class InformacaoComplementarModel {
  atividadeEconomica: AtividadeEconomicaModel = new AtividadeEconomicaModel()
  unidadeAuxiliar: string
  condicaoUso: string
  dataFinalContrato: string
  regimeApuracao: string
  situacaoCadastralVigente: string
  dataDestaSituacaoCadastral: string
  dataCadastramento: string
  operacaoComNfe: string
}
