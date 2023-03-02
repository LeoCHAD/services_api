import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQCuenta } from '../../../shared/utilities/ResponseQ';
import { CuentaDTO } from '../cuenta.dto';
import { Cuenta } from '../cuenta.entity';

export class EditarCuentaService {
  constructor(private readonly repository: CuentaRepository){
  }

  /**
   * Modificar información de entidad cuenta almacenada en repositorio
   * @param id 
   * @returns 
   */
  public editar = async (id: Guid, newData: CuentaDTO): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, newData);
      if (!responseEdit) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  }; //end method

}