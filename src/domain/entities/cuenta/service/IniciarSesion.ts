import { CuentaRepository } from "../../../repositories/cuenta.repository";
import { generateToken } from "../../../shared/services/handleToken";
import { ResponseQCuenta } from "../../../shared/services/ResponseQ";
import { Time } from "../../../shared/services/Time";
import { Cuenta } from "../cuenta.entity";
import { CuentaException } from "./cuentaException"; 
import { CuentaService } from "./cuentaService";

export class CuentaServiceIniciarSesion extends CuentaService {
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);
  }
  /**
   * Encargada de generar token de sesión
   * @returns 
   */
  public iniciarSession = async (): Promise<string> => {
    try {
      if (!Time.isOnTimeVerify()) throw new CuentaException(ResponseQCuenta.OUT_OF_TIME);
      const responseCuenta = await this.repository.consultByDetail({
        user: this.cuenta.user,
      });
      if (!responseCuenta) throw new CuentaException(ResponseQCuenta.NOT_FOUND);
      const resComapare = await responseCuenta?.comparePassword(this.cuenta.pass);
      if (!resComapare) throw new CuentaException(ResponseQCuenta.NOT_ACCESS);
      const token = await generateToken({
        idUser: responseCuenta?.id,
      });
      return token;
    } catch (error) {
      console.error(error);
      throw new CuentaException(ResponseQCuenta.ERROR);
    }
  }; // end method
}