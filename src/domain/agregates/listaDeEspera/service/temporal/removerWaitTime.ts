import { WaitTimeTemporalRepository } from "../../../../repositories/temporal.repository";
import { EntityException } from "../../../../shared/entities/EntityException";
import { ResponseQTemporal } from "../../../../shared/utilities/ResponseQ";

export class RemoverWaitTimeTemporal {
  constructor(private readonly repositoy: WaitTimeTemporalRepository) {}

  public remover = async (): Promise<void> => {
    try {
      const responseConsult = await this.repositoy.removeTemporal();
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTemporal>(ResponseQTemporal.ERROR);
    }
  };
}
