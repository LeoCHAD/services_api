import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQCuenta } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cuenta } from '../cuenta.entity';

export class EditarCuentaService extends EntityService<Cuenta> {
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);
  }

  /**
   * Modificar información de entidad cuenta almacenada en repositorio
   * @param id 
   * @returns 
   */
  public editarCuenta = async (id: Guid): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      if (!responseEdit) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  }; //end method

}