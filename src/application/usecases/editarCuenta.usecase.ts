import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { EditarCuentaService } from "../../domain/entities/cuenta/service/editarCuenta";

export class EditarCuentaUseCase {
  constructor(private readonly repository: CuentaRepository){}

  public editar = async (cuenta: Cuenta): Promise<Cuenta> =>{
    const serviceCuenta = new EditarCuentaService(cuenta, this.repository);
    const cuentaEditada = await serviceCuenta.editarCuenta(cuenta.id);
    return cuentaEditada;
  }
}