import { TemporalData, WaitTimeTemporalRepository } from "../../../../repositories/temporal.repository";
import { EntityException } from "../../../../shared/entities/EntityException";
import { ResponseQTemporal } from "../../../../shared/utilities/ResponseQ";

export class RegistrarWaitTimeTemporal {
  constructor(private readonly repositoy: WaitTimeTemporalRepository) {}
  
  
  public registrar = async (data: TemporalData[]): Promise<void> => {
    try {
      await this.repositoy.saveTemporal(data);
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTemporal>(ResponseQTemporal.ERROR);
    }
  };
}