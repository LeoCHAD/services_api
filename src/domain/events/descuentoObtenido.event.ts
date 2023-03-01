import { EventBase, EventBody } from "../shared/events/eventBase";
import { Guid } from "../shared/services/Guid";

// Definición del objeto de evento en la capa de dominio
export class DescuentoObtenidoEvent implements EventBase {
  public static readonly nameEvent: string = 'descuentoobtenido';
  public owner: Guid;
  public body: EventBody;
  constructor(owner: Guid, body: EventBody){
    this.owner = owner;
    this.body = body;
  }
}
