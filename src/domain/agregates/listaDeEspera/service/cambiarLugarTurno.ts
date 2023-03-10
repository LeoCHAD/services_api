import { EditarTurnoService } from "../../../entities/turno/service/editarTurno";
import { Turno } from "../../../entities/turno/turno.entity";
import {
  TemporalData,
  TurnNumberTemporalRepository,
  WaitTimeTemporalRepository
} from "../../../repositories/temporal.repository";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { Guid } from "../../../shared/services/Guid";
import { ResponseQListaDeEspera, ResponseQTurno } from "../../../shared/utilities/ResponseQ";
import { RegistrarTurnNumberTemporal } from "./temporal/registrarTurnNumber";
import { RegistrarWaitTimeTemporal } from "./temporal/registrarWaitTime";
import { RemoverTurnNumberTemporal } from "./temporal/removerTurnNumberTemp";
import { RemoverWaitTimeTemporal } from "./temporal/removerWaitTime";

export class CambiarLugarTurnoListaDeEsperaService {
  constructor(
    private readonly repositoryTurno: TurnoRepository,
    private readonly repositoryTempTurnNumber: TurnNumberTemporalRepository,
    private readonly repositoryTempWaitTime: WaitTimeTemporalRepository
  ) {}
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
    try {
      //servicio de editar turno
      const serviceEditTurno = new EditarTurnoService(this.repositoryTurno);
      //servicios para registrar tempalmente los números de turno y tiempo de espera
      const serviceRegistrarTempTurnNumber = new RegistrarTurnNumberTemporal(
        this.repositoryTempTurnNumber
      );
      const serviceRegistrarTempWaitTime = new RegistrarWaitTimeTemporal(
        this.repositoryTempWaitTime
      );
      const serviceRemoverTempTurnNumber = new RemoverTurnNumberTemporal(
        this.repositoryTempTurnNumber
      );
      const serviceRemoverTempWaitTime = new RemoverWaitTimeTemporal(
        this.repositoryTempTurnNumber
      );
      //obtenemos los datos del turno próximo a editar y disparamos posibles excepciones
      const turnoAEditar = await this.repositoryTurno.consultByDetail({
        id: turnoId.id,
      });
      if (turnoAEditar === null)
        throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);
  
      //obtenemos los datos de todos los turnos registrados en repositorio y lanzamos posibles excepciones
      const turnosdb = await this.repositoryTurno.consultMany("all");
      if (turnosdb === null)
        throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);
  
      //establecemos los turnNumber temporales para ser registrados
      let turnNumber0: TemporalData[] = [];
      //establecemos los waitTime temporales para ser registrados
      let waitTime0: TemporalData[] = [];
      const isDescendentChange = newTurnNumber > turnoAEditar[0].turnNumber;
  
      const isAfterOfNew = (turn: number): boolean => turn > newTurnNumber;
      const isBeforeOfNew = (turn: number): boolean => turn < newTurnNumber;
      const isAfterOfOld = (turn: number): boolean =>
        turn > turnoAEditar[0].turnNumber;
      const isBeforeOfOld = (turn: number): boolean =>
        turn < turnoAEditar[0].turnNumber;
  
      for (let turno of turnosdb) {
        //si el turno actual es el mismo que el turno a editar,
        //agregar el turno nuevo y su mismo tiempo de espera
        if (turno.id === turnoId) {
          turnNumber0.push({ turnNumber: newTurnNumber });
          waitTime0.push({ waitTime: turnoAEditar[0].duration });
        }
        //si el turno actual está antes del turno nuevo en un cambio ascendente
        //o si el turno actual está antes del turno antiguo en un cambio desendente
        //entonces no realizar ningun cambio y agregar
        if (
          (isBeforeOfNew(turno.turnNumber) && !isDescendentChange) ||
          (isBeforeOfOld(turno.turnNumber) && isDescendentChange)
        ) {
          turnNumber0.push({ turnNumber: turno.turnNumber });
          waitTime0.push({ waitTime: turno.turnNumber });
        }
        //si el turno actual está despues del turno nuevo en un cambio ascendente
        //y está antes del turno antiguo
        //entonces incrementar un turno y sumar la duración del turno
        //ascendido a cada tiempo de espera de los turnos
        if (
          isAfterOfNew(turno.turnNumber) &&
          !isDescendentChange &&
          isBeforeOfOld(turno.turnNumber)
        ) {
          turnNumber0.push({ turnNumber: turno.turnNumber + 1 });
          waitTime0.push({
            waitTime: turno.turnNumber + turnoAEditar[0].duration,
          });
        }
        //si el turno actual está despues del turno antiguo en un cambio descendente
        //y esta antes del turno nuevo
        //entonces decrementar un turno
        if (
          isAfterOfOld(turno.turnNumber) &&
          isDescendentChange &&
          isBeforeOfNew(turno.turnNumber)
        ) {
          turnNumber0.push({ turnNumber: turno.turnNumber - 1 });
          waitTime0.push({
            waitTime: turno.turnNumber - turnoAEditar[0].duration,
          });
        }
      } //end for
  
      //registramos los datos temporales
      const registrarTurnNumber = await serviceRegistrarTempTurnNumber.registrar(
        turnNumber0
      );
      const registrarwaithTime = await serviceRegistrarTempWaitTime.registrar(
        waitTime0
      );
  
      //editamos por lotes el turno a editar
      const responseEditTurno = await serviceEditTurno.editarPorLote(turnoId);
  
      //vaciamos las tablas temporales
      const responseRemoveTempTurnNumber =
        await serviceRemoverTempTurnNumber.remover();
      const responseRemoverTempWaitTime =
        await serviceRemoverTempWaitTime.remover();
      
      // querys en total 4
      return turnoAEditar[0];
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }
  }; //end method
}