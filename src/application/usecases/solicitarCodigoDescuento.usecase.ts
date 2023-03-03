import { Descuento } from "../../domain/entities/descuento/descuento.entity";
import { RegistrarDescuentoService } from "../../domain/entities/descuento/service/registrarDescuento";
import { DescuentoRepository } from "../../domain/repositories/descuento.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class SolicitarDescuentoUseCase {
  constructor(private readonly repository : DescuentoRepository){}
  public solicitar = async (cuentaId: Guid, percent: number): Promise<string> =>{
    const nuevoDescuento = new Descuento(new Guid(), cuentaId, percent);
    const serviceRegistrar = new RegistrarDescuentoService(nuevoDescuento, this.repository);
    const reponseRegistar = await serviceRegistrar.registrar();
    return reponseRegistar.codigo;
  }
}