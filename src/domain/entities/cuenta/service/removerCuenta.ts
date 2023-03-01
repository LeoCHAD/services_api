import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { ResponseQCuenta } from '../../../shared/services/ResponseQ';
import { EntityService } from '../../../shared/entities/EntityService';
import { Time } from '../../../shared/services/Time';
import { Cuenta } from '../cuenta.entity';
import { EntityException } from '../../../shared/entities/EntityException';
import { Observer } from '../../../shared/events/observer';
import { EventBase } from '../../../shared/events/eventBase';

export class RemoverCuentaService extends EntityService<Cuenta> implements Observer{
  
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);//los datos completos de cuenta no es requerida en el presente servicio
  }
  public notify =  (event: EventBase): void => {
    console.log(event);
  };

  /**
   * Remueve  del repositorio la instancia actual de la entidad
   * @returns 
   */
  public removerCuenta = async (): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      
      const responseEdit = await this.repository.remove(this.entity.id);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  };
}