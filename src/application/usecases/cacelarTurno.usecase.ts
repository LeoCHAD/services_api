import { RemoverTurnoService } from "../../domain/entities/Turno/service/removerTurno";
import { Turno } from "../../domain/entities/Turno/turno.entity";
import { MediatorEvents } from "../../domain/events/mediator";
import { TurnoCanceladoEvent } from "../../domain/events/turnoCanceladoEvent";
import { TurnoRepository } from "../../domain/repositories/turno.repository";

export class CancelarTurno {
  private mediator: MediatorEvents;
  constructor(private readonly repository: TurnoRepository) {
    this.mediator = new MediatorEvents();
  }

  public cancelar = async (turno: Turno): Promise<void> => {
    
    const removerObserver = new RemoverTurnoService(turno, this.repository);
    //el presente caso de uso requiere de la marticipación de la entidad y de su
    //servicio removerturno, por ello aplicamos el patrón mediador y subscribimos
    //ambos al evento turnocancelado
    this.mediator.subscribe(TurnoCanceladoEvent.nameEvent, turno);
    this.mediator.subscribe(TurnoCanceladoEvent.nameEvent, removerObserver);

    //creamos el evento
    const newEvent = new TurnoCanceladoEvent(turno.id, {
      data: turno,
      title: TurnoCanceladoEvent.nameEvent,
    });
    //propagamos el evento
    this.mediator.publish(TurnoCanceladoEvent.nameEvent, newEvent);
  };
}
