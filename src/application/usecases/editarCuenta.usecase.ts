import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { EditarCuentaService } from "../../domain/entities/cuenta/service/editarCuenta";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class EditarCuentaUseCase {
  constructor(private readonly repository: CuentaRepository){}

  public editar = async (cuentaId: Guid, newEmail: string, newPassword: string): Promise<Cuenta> =>{
    const serviceEditarCuenta = new EditarCuentaService(this.repository);
    const cuentaEditada = await serviceEditarCuenta.editar(cuentaId, {email: newEmail, password: newPassword});
    return cuentaEditada;
  }
}