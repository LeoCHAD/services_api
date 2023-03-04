import { TemporalData, TemporalRepository } from "../../../../repositories/temporal.repository";
import { EntityException } from "../../../../shared/entities/EntityException";
import { ResponseQTemporal } from "../../../../shared/utilities/ResponseQ";

export class RegistrarTemporalListaDeEsperaService {
  constructor(private readonly repositoy: TemporalRepository) {}

  public registrar = async (data: TemporalData[]): Promise<void> => {
    try {
      await this.repositoy.saveTemporal(data);
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTemporal>(ResponseQTemporal.ERROR);
    }
  };
}
