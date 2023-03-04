import { CambiarLugarTurnoListaDeEsperaService } from "../../domain/agregates/listaDeEspera/service/cambiarLugarTurno";
import {
  TurnNumberTemporalRepository,
  WaitTimeTemporalRepository,
} from "../../domain/repositories/temporal.repository";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class CambiarLugarTurno {
  constructor(
    private readonly repositoryTurno: TurnoRepository,
    private readonly repositoryTempTurnNumber: TurnNumberTemporalRepository,
    private readonly repositoryTempWaitTime: WaitTimeTemporalRepository
  ) {}

  /**
   *
   * @param turnoId
   * @param newTurnNumber
   * @returns
   */
  public cambiar = async (
    turnoId: Guid,
    newTurnNumber: number
  ): Promise<number> => {
    const serviceEdit = new CambiarLugarTurnoListaDeEsperaService(
      this.repositoryTurno,
      this.repositoryTempTurnNumber,
      this.repositoryTempWaitTime
    );
    const responseEdit = await serviceEdit.cambiarTurnoDeLugar(
      turnoId,
      newTurnNumber
    );
    return responseEdit.turnNumber;
  };
}
