import { TurnoCompletoEvent } from '../../../events/turnoCompletoEvent';
import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EventBase } from '../../../shared/events/eventBase';
import { Observer } from '../../../shared/events/observer';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQTurno } from '../../../shared/utilities/ResponseQ';
import { Turno } from '../turno.entity';

export class RemoverTurnoService implements Observer {
  constructor(private repository: TurnoRepository){}
  
  public notify =  (event: EventBase):void => {
    if(event.body.title === TurnoCompletoEvent.nameEvent){
      this.remover(event.owner);
    }
  };

  /**
   * Remueve  del repositorio la turno de la instancia actual
   * @param id 
   * @returns 
   */
  public remover = async (turnoId: Guid): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.remove(turnoId);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  };//end method
 
  /**
   * Remueve  del repositorio la turno de la instancia actual
   * @param id 
   * @returns 
   */
  public removerPorLote = async (turnoId: Guid): Promise<number> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.removeForLote(turnoId);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  };//end method
}