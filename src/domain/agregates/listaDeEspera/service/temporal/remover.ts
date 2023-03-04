import { TemporalRepository } from "../../../../repositories/temporal.repository";
import { EntityException } from "../../../../shared/entities/EntityException";
import { ResponseQTemporal } from "../../../../shared/utilities/ResponseQ";

export class RemoverTemporalListaDeEsperaService {
  constructor(private readonly repositoy: TemporalRepository) {}

  public remover = async (): Promise<void> => {
    try {
      const responseConsult = await this.repositoy.removeTemporal();
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTemporal>(ResponseQTemporal.ERROR);
    }
  };
}