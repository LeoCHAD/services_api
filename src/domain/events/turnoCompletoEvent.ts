import { EventBase, EventBody } from "../shared/events/eventBase";
import { Guid } from "../shared/services/Guid";

export class TurnoCompletoEvent implements EventBase {
  public static readonly nameEvent: string = 'turnocompleto';
  public owner: Guid;
  public body: EventBody;
  constructor(owner: Guid, body: EventBody){
    this.owner = owner;
    this.body = body;
  }
}
