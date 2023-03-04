import { RemoverTurnoService } from "../../../entities/turno/service/removerTurno";
import { Turno } from "../../../entities/turno/turno.entity";
import {
  TemporalData,
  TemporalRepository
} from "../../../repositories/temporal.repository";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { Guid } from "../../../shared/services/Guid";
import { ResponseQListaDeEspera, ResponseQTurno } from "../../../shared/utilities/ResponseQ";
import { RegistrarTemporalListaDeEsperaService } from "./temporal/registrar";
import { RemoverTemporalListaDeEsperaService } from "./temporal/remover";

export class RemoverTurnoListaDeEspera {
  constructor(
    private readonly repositoryTurno: TurnoRepository,
    private readonly repositoryTemporal: TemporalRepository,
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
      const serviceRegistrarTemporal = new RegistrarTemporalListaDeEsperaService(
        this.repositoryTemporal
      );
      const serviceRemoverTemporal = new RemoverTemporalListaDeEsperaService(
        this.repositoryTemporal
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
  
      //establecemos los datos temporales para ser registrados
      let temporalData: TemporalData[] = [];
      const isAfter = (turn: number): boolean =>
        turn > turnoARemover[0].turnNumber;
      const isBefore = (turn: number): boolean =>
        turn < turnoARemover[0].turnNumber;
  
      for (let i = 0; i < turnosdb.length; i++) {
        if (turnosdb[i].id === turnoARemover[0].id) {
          temporalData.push({ 
            id: turnosdb[i].id,
            turnNumber: i + 1,
            waitTime: turnosdb[i].waitTime
          });
        };
        if (isBefore(turnosdb[i].turnNumber)) {
          temporalData.push({ 
            id: turnosdb[i].id,
            turnNumber: turnosdb[i].turnNumber,
            waitTime: turnosdb[i].waitTime
          });
        }
        if (isAfter(turnosdb[i].turnNumber)) {
          temporalData.push({
            id: turnosdb[i].id, 
            turnNumber: i + 1,
            waitTime: turnosdb[i].waitTime
          });
          temporalData.push({
            id: turnosdb[i].id,
            turnNumber: 0,
            waitTime: turnosdb[i].waitTime - turnoARemover[0].duration
          });
        }
      } //for end
  
      //registramos los datos temporales
      const resRegistrarTemporal = await serviceRegistrarTemporal.registrar(
        temporalData
      );
  
      //removemos el turno por lote
      const responseRemoveTurno = await serviceRemoverTurno.removerPorLote(
        turnoId
      );
  
      //vaciamos las tablas temporales
      const responseRemoveTemporal =
        await serviceRemoverTemporal.remover();
  
      //4 querys en total
      return turnoARemover[0];
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }

  };
}
