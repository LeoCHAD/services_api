import { Descuento } from "../../domain/entities/descuento/descuento.entity";
import { Guid } from "../../domain/shared/services/Guid";

export class SolicitarDescuentoUseCase {

  public solicitar = async (cuentaId: Guid, percent: number): Promise<Descuento> =>{
    const nuevoDescuento = new Descuento(new Guid(), cuentaId, percent);
    return nuevoDescuento;
  }
}