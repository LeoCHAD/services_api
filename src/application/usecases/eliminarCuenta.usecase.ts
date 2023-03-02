import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { RemoverCuentaService } from "../../domain/entities/cuenta/service/removerCuenta";
import { MediatorEvents } from "../../domain/events/mediator";
import { ClienteRemovidoEvent } from "../../domain/events/clienteRemovido.event";
import { EventBody } from "../../domain/shared/events/eventBase";
import { Notificacion } from "../../domain/entities/notificacion/notificacion.entity";
import { Guid } from "../../domain/shared/services/Guid";

export class EliminarCuentaUseCase {
  constructor(private readonly repository: CuentaRepository){}

  public eliminar = async (cuentaId: Guid) =>{
    const serviceCuenta = new RemoverCuentaService(this.repository);
    const cuentaRemovida = await serviceCuenta.remover(cuentaId);
    return cuentaRemovida;
  }
}