import { Descuento } from "../../domain/entities/descuento/descuento.entity";
import { ConsultarDescuentoService } from "../../domain/entities/descuento/service/consultarDescuento";
import { DescuentoRepository } from "../../domain/repositories/descuento.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class ConsultarDescuentoUseCase {
  constructor(private readonly repository: DescuentoRepository){}

  public consultar = async (): Promise<Descuento[]> => {
    const serviceConsultar = new ConsultarDescuentoService(this.repository);
    const responseConsultar = await serviceConsultar.consultar()
    return responseConsultar;
  }
}