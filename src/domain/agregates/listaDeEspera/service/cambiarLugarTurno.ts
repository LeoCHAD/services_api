import { EditarTurnoService } from "../../../entities/turno/service/editarTurno";
import { Turno } from "../../../entities/turno/turno.entity";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { Guid } from "../../../shared/services/Guid";
import { ResponseQTurno } from "../../../shared/utilities/ResponseQ";

export class CambiarLugarTurnoListaDeEsperaService {
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

    const turnoAEditar = await this.repository.consultByDetail({
      id: turnoId.id,
    });
    if (turnoAEditar === null)
      throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);

    const turnosdb = await this.repository.consultMany("all");
    if (turnosdb === null)
      throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);

    let resEdit: Promise<Turno>[] = [];
    const isDescendentChange = newTurnNumber > turnoAEditar[0].turnNumber;

    const isAfterOfNew = (turn: number): boolean => turn > newTurnNumber;
    const isBeforeOfNew = (turn: number): boolean => turn < newTurnNumber;
    const isAfterOfOld = (turn: number): boolean =>
      turn > turnoAEditar[0].turnNumber;
    const isBeforeOfOld = (turn: number): boolean =>
      turn < turnoAEditar[0].turnNumber;

    for (let turno of turnosdb) {
      //si el turno actual está antes del turno nuevo en un cambio ascendente
      //o si el turno actual está antes del turno antiguo en un cambio desendente
      //entonces ignorar y continuar
      if (
        (isBeforeOfNew(turno.turnNumber) && !isDescendentChange) ||
        (isBeforeOfOld(turno.turnNumber) && isDescendentChange)
      )
        continue;
      //si el turno actual está despues del turno nuevo en un cambio ascendente
      //y está antes del turno antiguo
      //entonces incrementar un turno
      if (
        isAfterOfNew(turno.turnNumber) &&
        !isDescendentChange &&
        isBeforeOfOld(turno.turnNumber)
      ) {
        resEdit.push(
          serviceEdit.editar(turno.id, {
            turnNumber: turno.turnNumber + 1,
          })
        );
      }
      //si el turno actual está despues del turno antiguo en un cambio descendente
      //y esta antes del turno nuevo
      //entonces decrementar un turno
      if (
        isAfterOfOld(turno.turnNumber) &&
        isDescendentChange &&
        isBeforeOfNew(turno.turnNumber)
      ) {
        resEdit.push(
          serviceEdit.editar(turno.id, {
            turnNumber: turno.turnNumber - 1,
          })
        );
      }
    }//end for
    const turnosNumberEditados = await Promise.all(resEdit);

    let esperaAcumulada = 0;
    const resEdit2: Promise<Turno>[] = [] 

    for(let turno of turnosNumberEditados) {
      esperaAcumulada += turno.turnNumber;
      if (
        (isBeforeOfNew(turno.turnNumber) && !isDescendentChange) ||
        (isBeforeOfOld(turno.turnNumber) && isDescendentChange)
      )
        continue;
      if (turno.turnNumber >= newTurnNumber) {
        return serviceEdit.editar(turno.id, { waitTime: esperaAcumulada });
      }
    };
    const turnosWaitTEditados = await Promise.all(resEdit2);
    const editarTurno = await this.repository.edit(turnoId, {turnNumber: newTurnNumber})

    return editarTurno;
  }; //end method

 
}
