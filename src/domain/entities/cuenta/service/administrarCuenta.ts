import { CuentaRepository } from '../../../repositories/cuenta.repository';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQCuenta } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cuenta } from '../cuenta.entity';
import { CuentaService } from './cuentaService';

export class CuentaServiceAdminstrarCuenta extends CuentaService {
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);
  }
  public createCuenta = async (): Promise<Cuenta | ResponseQCuenta> => {
    try {
      if (!Time.isOnTimeVerify()) return ResponseQCuenta.OUT_OF_TIME;
      const responseSave = await this.repository.save(this.cuenta);
      if (!responseSave) return ResponseQCuenta.ERROR;
      return responseSave;
    } catch (error) {
      console.error(error);
      return ResponseQCuenta.ERROR;
    }
  }; //end method

  public editarCuenta = async (id: Guid): Promise<Cuenta | ResponseQCuenta> => {
    try {
      if (!Time.isOnTimeVerify()) return ResponseQCuenta.OUT_OF_TIME;
      const responseEdit = await this.repository.edit(id, this.cuenta);
      if (!responseEdit) return ResponseQCuenta.ERROR;
      return responseEdit;
    } catch (error) {
      console.error(error);
      return ResponseQCuenta.ERROR;
    }
  }; //end method
  /**
   * Remueve  del repositorio la cuenta identificda con el id
   * @param repository 
   * @param id 
   * @returns 
   */
  public removerCuenta = async (id: Guid): Promise<Cuenta | ResponseQCuenta> => {
    try {
      if (!Time.isOnTimeVerify()) return ResponseQCuenta.OUT_OF_TIME;
      const responseEdit = await this.repository.remove(id);
      if (!responseEdit) return ResponseQCuenta.ERROR;
      return responseEdit;
    } catch (error) {
      console.error(error);
      return ResponseQCuenta.ERROR;
    }
  };
}