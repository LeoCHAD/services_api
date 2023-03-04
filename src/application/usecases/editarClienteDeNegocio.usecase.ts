import { ClienteDeNegocioDTO } from "../../domain/entities/clienteDeNegocio/clienteDeNegocio.dto";
import { ClienteDeNegocio } from "../../domain/entities/clienteDeNegocio/clienteDeNegocio.entity";
import { EditarClienteDeNegocioService } from "../../domain/entities/clienteDeNegocio/service/editarClienteDeNegocio";
import { CuentaDTO } from "../../domain/entities/cuenta/cuenta.dto";
import { EditarCuentaService } from "../../domain/entities/cuenta/service/editarCuenta";
import { ClienteDeNegocioRepository } from "../../domain/repositories/clienteDeNegocio.repository";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class EditarClienteDeNegocioUseCase {
  constructor(private readonly cuentaRepository: CuentaRepository, private readonly clienteDNRepository: ClienteDeNegocioRepository){}

  public editar = async (clienteId: Guid, dataCliente: ClienteDeNegocioDTO, dataCuenta: CuentaDTO): Promise<ClienteDeNegocio> =>{
    //declaramos los servicios que empelaremos en le presente caso de uso
    const serviceEditarCuenta = new EditarCuentaService(this.cuentaRepository);
    const serviceEditarCliDN = new EditarClienteDeNegocioService(this.clienteDNRepository);

    const cuentaEditada = await serviceEditarCuenta.editar(clienteId, dataCuenta);
    const clienteEditado = await serviceEditarCliDN.editar(clienteId, dataCliente);
    return clienteEditado;
  }
}