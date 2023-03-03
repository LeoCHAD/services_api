import { EditarListaDeEsperaService } from "../../domain/agregates/listaDeEspera/service/cambiarLugarTurno";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class CambiarLugarTurno {
  constructor(private readonly repository: TurnoRepository){}

  /**
   * 
   * @param turnoId 
   * @param newTurnNumber 
   * @returns 
   */
  public cambiar = async (turnoId: Guid, newTurnNumber: number): Promise<number> =>{
    const serviceEdit = new EditarListaDeEsperaService(this.repository);
    const responseEdit = await serviceEdit.cambiarTurnoDeLugar(turnoId, newTurnNumber);
    return responseEdit.turnNumber;
  }
}