import { RemoverTurnoService } from "../../../entities/turno/service/removerTurno";
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

export class RemoverTurnoListaDeEspera {
  constructor(
    private readonly repositoryTurno: TurnoRepository,
    private readonly repositoryTempTurnNumber: TurnNumberTemporalRepository,
    private readonly repositoryTempWaitTime: WaitTimeTemporalRepository
  ) {}

  /**
   * Emcargada de remover un turno presente en la lista de espera
   * a su véz edita cada turno para acomodar la falta del turno saliente
   * @param turnoId id de turno a remover
   * @returns
   */
  public removerTurno = async (turnoId: Guid): Promise<Turno> => {
    try {
      //servicio para editar turno Y servicio para remover turno
      const serviceRemoverTurno = new RemoverTurnoService(this.repositoryTurno);
  
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
  
      //obtenemos los datos del turno próximo a remover y disparamos posibles excepciones
      const turnoARemover = await this.repositoryTurno.consultByDetail({
        id: turnoId.id,
      });
      if (turnoARemover === null)
        throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);
  
      //obtenemos los datos de todos los turnos registrados en repositorio y lanzamos posibles excepciones
      const turnosdb = await this.repositoryTurno.consultMany("all");
      if (turnosdb === null)
        throw new EntityException<ResponseQTurno>(ResponseQTurno.NOT_FOUND);
  
      //establecemos los turnNumber temporales para ser registrados
      let turnNumber0: TemporalData[] = [];
      for (let i = 0; i < turnosdb.length - 1; i++)
        turnNumber0.push({ "turnNumber" : i + 1 });
  
      //establecemos los waitTime temporales para ser registrados
      let waitTime0: TemporalData[] = [];
      const isAfter = (turn: number): boolean =>
        turn > turnoARemover[0].turnNumber;
      const isBefore = (turn: number): boolean =>
        turn < turnoARemover[0].turnNumber;
  
      for (let turno of turnosdb) {
        if (turno.id === turnoARemover[0].id) continue;
        if (isBefore(turno.turnNumber)) {
          waitTime0.push({ "waitTime": turno.waitTime });
        }
        if (isAfter(turno.turnNumber)) {
          waitTime0.push({
            "waitTime": turno.waitTime - turnoARemover[0].duration,
          });
        }
      } //for end
  
      //registramos los datos temporales
      const registrarTurnNumber = await serviceRegistrarTempTurnNumber.registrar(
        turnNumber0
      );
      const registrarwaithTime = await serviceRegistrarTempWaitTime.registrar(
        waitTime0
      );
  
      //removemos el turno por lote
      const responseRemoveTurno = await serviceRemoverTurno.removerPorLote(
        turnoId
      );
  
      //vaciamos las tablas temporales
      const responseRemoveTempTurnNumber =
        await serviceRemoverTempTurnNumber.remover();
      const responseRemoverTempWaitTime =
        await serviceRemoverTempWaitTime.remover();
  
      //4 querys en total
      return turnoARemover[0];
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }

  };
}
