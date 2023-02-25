import { TurnoRepository } from '../../../repositories/turno.repository';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQTurno } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Turno } from '../turno.entity';
import { TurnoException } from './TurnoException';
import { TurnoService } from './turnoService';

export class TurnoServiceAdminstrarTurno extends TurnoService {
  constructor(turno: Turno, private repository: TurnoRepository){
    super(turno);
  }

  /**
   * Registra turno actual en repositorio
   * @returns 
   */
  public crearTurno = async (): Promise<Turno | ResponseQTurno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new TurnoException(ResponseQTurno.OUT_OF_TIME);
      const responseSave = await this.repository.save(this.turno);
      if (!responseSave) throw new TurnoException(ResponseQTurno.ERROR);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new TurnoException(ResponseQTurno.ERROR);
    }
  }; //end method

  /**
   * Modifica los datos de turno identificado con el id con los datos actualmente 
   * instanciados
   * @param id 
   * @returns 
   */
  public editarTurno = async (id: Guid): Promise<Turno | ResponseQTurno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new TurnoException(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.turno);
      if (!responseEdit) throw new TurnoException(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new TurnoException(ResponseQTurno.ERROR)
    }
  }; //end method

  /**
   * Remueve  del repositorio el turno identificado con el id
   * @param repository 
   * @param id 
   * @returns 
   */
  public removerTurno = async (id: Guid): Promise<Turno | ResponseQTurno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new TurnoException(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.remove(id);
      if (!responseEdit) throw new TurnoException(ResponseQTurno.ERROR)
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new TurnoException(ResponseQTurno.ERROR)
    }
  };//end method
}