import { TurnoCanceladoEvent } from "../../events/turnoCanceladoEvent";
import { TurnoCompletoEvent } from "../../events/turnoCompletoEvent";
import { EntityBase } from "../../shared/entities/EntityBase";
import { EventBase } from "../../shared/events/eventBase";
import { Observer } from "../../shared/events/observer";
import { Guid } from "../../shared/services/Guid"; 

export class Turno extends EntityBase implements Observer {
  public readonly duracion: number;
  public readonly turnNumber: number;
  public readonly cretatedAt: number;
  private durationControler: NodeJS.Timeout;
  private observers: Observer[] = [];

  constructor(id: Guid, turnNumber: number, duracion: number) {
    super(id);
    this.turnNumber = turnNumber;
    this.duracion = duracion;
    this.cretatedAt = new Date().getTime();
    this.durationControler = globalThis.setTimeout(()=>this.turnoCompleto(),duracion)
  }
  public notify =  (event: EventBase):void => {
    globalThis.console.log('desde turno', event);
    switch (event.body.title) {
      case TurnoCanceladoEvent.nameEvent:
        globalThis.clearTimeout(this.durationControler);
        break;
      default:
        break;
    }
  };
  private turnoCompleto(){
    const newEvent = new TurnoCompletoEvent(this._id, {
      title: TurnoCompletoEvent.nameEvent,
      data: this,
    })
    this.observers.forEach(obs=>{
      obs.notify(newEvent);
    })
  }

  public subscribeOnComplete(observer: Observer){
      this.observers.push(observer)
  }
}