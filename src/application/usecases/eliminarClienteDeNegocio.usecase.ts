import { EditarListaDeEsperaService } from "../../domain/agregates/listaDeEspera/service/cambiarLugarTurno";
import { RemoverClienteDeNegocioService } from "../../domain/entities/clienteDeNegocio/service/removerCienteDenegocio";
import { RemoverCuentaService } from "../../domain/entities/cuenta/service/removerCuenta";
import { ClienteDeNegocioRepository } from "../../domain/repositories/clienteDeNegocio.repository";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class EliminarClienteDeNegocioUseCase {
  constructor(
    private readonly cuentaRepository: CuentaRepository,
    private readonly clienteDNRepository: ClienteDeNegocioRepository,
    private readonly turnoRepository: TurnoRepository
  ) {}

  public eliminar = async (clienteId: Guid) => {
    //declaramos los servicios que usaremos en el presente caso de uso
    const serviceRemoverCliDN = new RemoverClienteDeNegocioService(
      this.clienteDNRepository
    );
    const serviceRemoverCuenta = new RemoverCuentaService(
      this.cuentaRepository
    );
    const serviceEditarListaDeEspera = new EditarListaDeEsperaService(this.turnoRepository);

    //consultamos los turnos asociados al cliente
    const turnosDeCuenta = await this.turnoRepository.consultByDetail({
      ownerId: clienteId,
    });
    //en caso de encontrar turnos los removemos en una sucesión de peticiones
    if (turnosDeCuenta !== null) {
      const res = turnosDeCuenta.map(async (turno) =>
      serviceEditarListaDeEspera.removerTurno(turno.id)
      );
      const turnosRemovidos = await Promise.all(res);
    }
    //procedemos a remover el cleinteDN
    const clienteDNRemovido = await serviceRemoverCliDN.remover(clienteId);
    //procedemos a remover la cuenta socicada al clienteDN
    const cuentaRemovida = await serviceRemoverCuenta.remover(
      clienteDNRemovido.cuentaId
    );
    return clienteDNRemovido;
  };
}
