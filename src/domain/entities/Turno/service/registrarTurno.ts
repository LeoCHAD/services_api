import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { EventBase } from '../../../shared/events/eventBase';
import { Observer } from '../../../shared/events/observer';
import { ResponseQTurno } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Turno } from '../turno.entity';

export class RegistrarTurnoService extends EntityService<Turno> implements Observer {
  constructor(turno: Turno, private repository: TurnoRepository){
    super(turno);
  }
  public notify = (event: EventBase): void => {
    console.log(event);
  };

  /**
   * Registro de entidad turno a partir de la instancia actual
   * @returns 
   */
  public crearTurno = async (): Promise<Turno> => {
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