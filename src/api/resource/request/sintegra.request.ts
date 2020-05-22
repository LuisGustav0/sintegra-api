import { IHttpRequest } from '../../protocol'
import Sintegra from '../../domain/model/sintegra.model'

export default class SintegraRequest implements IHttpRequest {
  body: Sintegra = new Sintegra()
}
