import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Time } from '../../../shared/services/Time';
import { ResponseQTurno } from '../../../shared/utilities/ResponseQ';
import { Turno } from '../turno.entity';

export class RegistrarTurnoService extends EntityService<Turno> {
  constructor(turno: Turno, private readonly repository: TurnoRepository){
    super(turno);
  }
  /**
   * Registro de entidad turno a partir de la instancia actual
   * @returns 
   */
  public registrar = async (): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseSave = await this.repository.save(this.entity);
      if (!responseSave) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  }; //end method

}