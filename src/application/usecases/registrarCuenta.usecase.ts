import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { RegistrarCuentaService } from "../../domain/entities/cuenta/service/registrarCuenta";
import { CuentaDTO } from "../../domain/entities/cuenta/cuenta.dto";

export class RegistrarCuentaUseCase {
  constructor(private readonly repository: CuentaRepository){}

  public registrar = async (dataCuenta: CuentaDTO): Promise<Cuenta> =>{
    const serviceCuenta = new RegistrarCuentaService(dataCuenta, this.repository);
    const cuentaRegistrada = await serviceCuenta.registrar();
    return cuentaRegistrada;
  }
}