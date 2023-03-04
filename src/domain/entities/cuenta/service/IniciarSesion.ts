import { CuentaRepository } from "../../../repositories/cuenta.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { generateToken } from "../../../shared/services/handleToken";
import { Time } from "../../../shared/services/Time";
import { ResponseQCuenta } from "../../../shared/utilities/ResponseQ";

export class IniciarSesionCuentaService {
  constructor(private readonly repository: CuentaRepository){}
  /**
   * Encargada de generar token de sesión
   * @returns 
   */
  public iniciarSession = async (email: string, password: string): Promise<string> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      const responseCuenta = await this.repository.consultByDetail({
        email,
      });
      if (responseCuenta === null) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.NOT_FOUND);
      const resComapare = await responseCuenta?.comparePassword(password);
      if (!resComapare) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.NOT_ACCESS);
      const token = await generateToken({
        idUser: responseCuenta?.id,
      }, '2d');
      return token;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  }; // end method
}