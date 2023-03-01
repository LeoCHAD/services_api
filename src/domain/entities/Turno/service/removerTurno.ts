import { TurnoCompletoEvent } from '../../../events/turnoCompletoEvent';
import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { EventBase } from '../../../shared/events/eventBase';
import { Observer } from '../../../shared/events/observer';
import { ResponseQTurno } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Turno } from '../turno.entity';

export class RemoverTurnoService extends EntityService<Turno> implements Observer {
  constructor(turno: Turno, private repository: TurnoRepository){
    super(turno);//los datos completos de cuenta no es requerida en el presente servicio
  }
  public notify =  (event: EventBase):void => {
    if(event.body.title === TurnoCompletoEvent.nameEvent){
      this.removerTurno();
    }
  };

  /**
   * Remueve  del repositorio la turno de la instancia actual
   * @param id 
   * @returns 
   */
  public removerTurno = async (): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.remove(this.entity.id);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  };//end method
}