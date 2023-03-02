import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQNotificacion } from '../../../shared/utilities/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Notificacion } from '../notificacion.entity';

export class CrearNotificacionService extends EntityService<Notificacion> {
  constructor(private notificacion: Notificacion){
    super(notificacion);
  }

  /**
   * Registro de entidad notificacion a partir de la instancia actual
   * @returns 
   */
  public crearNotificacion = async (): Promise<Notificacion> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQNotificacion>(ResponseQNotificacion.OUT_OF_TIME);
      return  this.notificacion;      
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQNotificacion>(ResponseQNotificacion.ERROR);
    }
  }; //end method
}