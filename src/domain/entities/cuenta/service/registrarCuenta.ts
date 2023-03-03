import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQCuenta } from '../../../shared/utilities/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cuenta } from '../cuenta.entity';
import { Guid } from '../../../shared/services/Guid';
import { CuentaDTO } from '../cuenta.dto';

export class RegistrarCuentaService extends EntityService<Cuenta> {
  constructor(dataCuenta: CuentaDTO, private readonly repository: CuentaRepository){
    super(new Cuenta(new Guid(), dataCuenta.email, dataCuenta.password));
  }
  /**
   * Registro de entidad cuenta a partir de la instancia actual
   * @returns
   */
  public registrar = async (): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      
      const responseCuenta = await this.repository.consultByDetail({
        email: this.entity.email,
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