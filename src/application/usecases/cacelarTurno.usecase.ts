import { EditarListaDeEsperaService } from "../../domain/agregates/listaDeEspera/service/editarListaDeEspera";
import { RemoverTurnoService } from "../../domain/entities/Turno/service/removerTurno";
import { Turno } from "../../domain/entities/Turno/turno.entity";
import { MediatorEvents } from "../../domain/events/mediator";
import { TurnoCanceladoEvent } from "../../domain/events/turnoCanceladoEvent";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class CancelarTurno {
  constructor(private readonly repository: TurnoRepository) {}

  public cancelar = async (turnoId: Guid): Promise<void> => {
    const removerService = new EditarListaDeEsperaService(this.repository);
    const responseRemover = await removerService.removerTurno(turnoId);
  };
}
