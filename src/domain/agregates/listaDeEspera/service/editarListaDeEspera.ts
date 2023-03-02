import { EditarTurnoService } from "../../../entities/Turno/service/editarTurno";
import { RemoverTurnoService } from "../../../entities/Turno/service/removerTurno";
import { Turno } from "../../../entities/Turno/turno.entity";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { Guid } from "../../../shared/services/Guid";

export class EditarListaDeEsperaService {
  constructor(private readonly repository: TurnoRepository) {}
  /**
   * Modificar información de entidad lista de espera almacenada en repositorio
   * @param {Guid} turnoId
   * @param {number} newTurnNumber
   * @returns
   */
  public cambiarTurnoDeLugar = async (
    turnoId: Guid,
    newTurnNumber: number
  ): Promise<Turno> => {
    const serviceEdit = new EditarTurnoService(this.repository);
    const responseEdit = await serviceEdit.editar(turnoId, {
      turnNumber: newTurnNumber,
    });
    return responseEdit;
  }; //end method

  /**
   * Emcargada de remover un turno presente en la lista de espera
   * @param turnoId id de turno a remover
   * @returns
   */
  public removerTurno = async (turnoId: Guid): Promise<Turno> => {
    const serviceRemover = new RemoverTurnoService(this.repository);
    const reposneRemover = await serviceRemover.removerTurno(turnoId);
    return reposneRemover;
  };
}
