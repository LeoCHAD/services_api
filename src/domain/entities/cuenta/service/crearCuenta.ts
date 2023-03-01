import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQCuenta } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cuenta } from '../cuenta.entity';

export class CrearCuentaService extends EntityService<Cuenta> {
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);
  }
  /**
   * Registro de entidad cuenta a partir de la instancia actual
   * @returns
   */
  public crearCuenta = async (): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      
      const responseCuenta = await this.repository.consultByDetail({
        user: this.entity.user,
      });
      if (responseCuenta !== null) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ALREADY_EXIST);
      const responseSave = await this.repository.save(this.entity);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  }; //end method

}