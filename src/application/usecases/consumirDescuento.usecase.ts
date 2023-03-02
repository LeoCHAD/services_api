import { ConsumirDescuentoService } from "../../domain/entities/descuento/service/consumirDescuento";
import { DescuentoRepository } from "../../domain/repositories/descuento.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class ConsumirDescuentoUseCase {
  constructor(private readonly repository: DescuentoRepository) {}

  public consumir = async (descuentoId: Guid): Promise<boolean> => {
    const consumirDescuentoService = new ConsumirDescuentoService(this.repository);
    const resposneConsumir = consumirDescuentoService.consumir(descuentoId);
    return resposneConsumir;
  };
}
