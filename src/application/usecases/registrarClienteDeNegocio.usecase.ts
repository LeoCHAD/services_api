import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { RegistrarCuentaService } from "../../domain/entities/cuenta/service/registrarCuenta";
import { CuentaDTO } from "../../domain/entities/cuenta/cuenta.dto";
import { ClienteDeNegocioRepository } from "../../domain/repositories/clienteDeNegocio.repository";
import { RegistrarClienteDeNegocioService } from "../../domain/entities/clienteDeNegocio/service/registrarClienteDeNegocio";
import { ClienteDeNegocioDTO } from "../../domain/entities/clienteDeNegocio/clienteDeNegocio.dto";
import { ClienteDeNegocio } from "../../domain/entities/clienteDeNegocio/clienteDeNegocio.entity";

export class RegistrarCLienteDeNegocioUseCase {
  constructor(
    private readonly cuentaRepository: CuentaRepository,
    private readonly clienteDeNegocioRepository: ClienteDeNegocioRepository
  ) {}

  public registrar = async (
    dataCuenta: CuentaDTO,
    name: string,
    celNumber: number
  ): Promise<ClienteDeNegocio> => {
    const serviceCuenta = new RegistrarCuentaService(
      dataCuenta,
      this.cuentaRepository
    );
    const cuentaRegistrada = await serviceCuenta.registrar();

    const serviceClienteDN = new RegistrarClienteDeNegocioService(
      { name, celNumber, cuentaId: cuentaRegistrada.id },
      this.clienteDeNegocioRepository
    );
    const clienteRegistrado = await serviceClienteDN.registrar();

    return clienteRegistrado;
  };
}
