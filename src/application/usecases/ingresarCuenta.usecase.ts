import { IniciarSesionCuentaService } from "../../domain/entities/cuenta/service/IniciarSesion";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";

export class IngresarCuentaUsecase {
  constructor(private readonly repository: CuentaRepository){}

  /**
   * realiza el ingreso de cuenta al sistema retornando un token de sesion
   * @param {string} email 
   * @returns token de sesión
   */
  public ingresar = async (email: string, password: string): Promise<string>=>{
    const serviceIniciarS = new IniciarSesionCuentaService(this.repository);
    const iniciarResponseToken = await serviceIniciarS.iniciarSession(email, password);
    return iniciarResponseToken;
  }
}