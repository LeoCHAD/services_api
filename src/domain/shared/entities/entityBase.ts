import { Guid } from "../services/Guid";

/**
 * Entidad base que establece el atributo _id el cual será común a todas
 * las entidades del dominio y solo podra modificaerse desde la misma clase
 * o desde sus clases derivadas, sin embargo, podrá ser accedido por cualquier
 *  contexto  que requiera hacer validaciones
 */
export abstract class EntityBase {
  constructor(protected _id: Guid) {}

  private set id(id: Guid) {
    this._id = id;
  }
  public get id(): Guid {
    return this._id;
  }

}
