import { EntityBase } from "../../shared/entities/EntityBase";
import { EventBase, EventBody } from "../../shared/events/eventBase";
import { Observer } from "../../shared/events/observer";
import { Guid } from "../../shared/services/Guid";

export class Notificacion extends EntityBase implements Observer{
  private readonly evento?: EventBody;
  
  constructor(){
    super(new Guid());
  }
  notify = (event: EventBase): void => {
    
    console.log('desde entidad notificacion=> ',event.body.data.id === event.owner);
  };
}