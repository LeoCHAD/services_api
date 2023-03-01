import { NotificacionRepository } from '../../../repositories/notificacion.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQNotificacion } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Notificacion } from '../notificacion.entity';

export class CrearNotificacionService extends EntityService<Notificacion> {
  constructor(notificacion: Notificacion, private repository: NotificacionRepository){
    super(notificacion);
  }

  /**
   * Registro de entidad notificacion a partir de la instancia actual
   * @returns 
   */
  public crearNotificacion = async (): Promise<Notificacion> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQNotificacion>(ResponseQNotificacion.OUT_OF_TIME);
      
      const responseSave = await this.repository.save(this.entity);
      if (!responseSave) throw new EntityException<ResponseQNotificacion>(ResponseQNotificacion.ERROR);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQNotificacion>(ResponseQNotificacion.ERROR);
    }
  }; //end method
}