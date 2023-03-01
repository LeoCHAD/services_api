import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { CrearCuentaService } from "../../domain/entities/cuenta/service/crearCuenta";

export class RegistrarCuentaUseCase {
  constructor(private readonly repository: CuentaRepository){}

  public registrar = async (cuenta: Cuenta): Promise<Cuenta> =>{
    const serviceCuenta = new CrearCuentaService(cuenta, this.repository);
    const cuentaRegistrada = await serviceCuenta.crearCuenta();
    return cuentaRegistrada;
  }
}