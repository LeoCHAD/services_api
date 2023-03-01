import { CuentaRepository } from "../../../repositories/cuenta.repository";
import { generateToken } from "../../../shared/services/handleToken";
import { ResponseQCuenta } from "../../../shared/services/ResponseQ";
import { EntityService } from "../../../shared/entities/EntityService";
import { Time } from "../../../shared/services/Time";
import { Cuenta } from "../cuenta.entity";
import { EntityException } from "../../../shared/entities/EntityException";

export class CuentaServiceIniciarSesion extends EntityService<Cuenta> {
  constructor(cuenta: Cuenta, private repository: CuentaRepository){
    super(cuenta);
  }
  /**
   * Encargada de generar token de sesión
   * @returns 
   */
  public iniciarSession = async (): Promise<string> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      const responseCuenta = await this.repository.consultByDetail({
        user: this.entity.user,
      });
      if (responseCuenta === null) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.NOT_FOUND);
      const resComapare = await responseCuenta?.comparePassword(this.entity.pass);
      if (!resComapare) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.NOT_ACCESS);
      const token = await generateToken({
        idUser: responseCuenta?.id,
      });
      return token;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  }; // end method
}