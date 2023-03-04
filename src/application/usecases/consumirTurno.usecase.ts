import { RemoverTurnoListaDeEspera } from "../../domain/agregates/listaDeEspera/service/removerTurno";
import {
  TurnNumberTemporalRepository,
  WaitTimeTemporalRepository,
} from "../../domain/repositories/temporal.repository";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class ConsumirTurnoUseCase {
  constructor(
    private readonly repositoryTurno: TurnoRepository,
    private readonly repositoryTempTurnNumber: TurnNumberTemporalRepository,
    private readonly repositoryTempWaitTime: WaitTimeTemporalRepository
  ) {}

  public consumir = async (turnoId: Guid): Promise<void> => {
    const removerService = new RemoverTurnoListaDeEspera(
      this.repositoryTurno,
      this.repositoryTempTurnNumber,
      this.repositoryTempWaitTime
    );
    const responseRemover = await removerService.removerTurno(turnoId);
  };
}
