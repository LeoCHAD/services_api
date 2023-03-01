import { Cuenta } from "../../domain/entities/cuenta/cuenta.entity";
import { CuentaRepository } from "../../domain/repositories/cuenta.repository";
import { RemoverCuentaService } from "../../domain/entities/cuenta/service/removerCuenta";
import { MediatorEvents } from "../../domain/events/mediator";
import { ClienteRemovidoEvent } from "../../domain/events/clienteRemovido.event";
import { EventBody } from "../../domain/shared/events/eventBase";
import { Notificacion } from "../../domain/entities/notificacion/notificacion.entity";

export class EliminarCuentaUseCase {
  private readonly mediator: MediatorEvents;

  constructor(private readonly repository: CuentaRepository){
    this.mediator = new MediatorEvents();
    this.mediator.subscribe(ClienteRemovidoEvent.nameEvent, new Notificacion())
  }

  public eliminar = async (cuenta: Cuenta) =>{
    const serviceCuenta = new RemoverCuentaService(cuenta, this.repository);
    const cuentaRemovida = await serviceCuenta.removerCuenta();

    //event...
    const newEvent = new ClienteRemovidoEvent(cuenta.id, {
      title: ClienteRemovidoEvent.nameEvent,
      data: cuenta
    } as EventBody)
    this.mediator.publish(ClienteRemovidoEvent.nameEvent, newEvent)

    return cuentaRemovida;
  }
}