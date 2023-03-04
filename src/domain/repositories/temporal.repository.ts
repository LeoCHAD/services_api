import { Repository } from "../shared/repositories/repository.interface";
import { Guid } from "../shared/services/Guid";

export interface TemporalData {
  id: Guid;
  turnNumber: number;
  waitTime: number;
}

export interface TemporalRepository extends Repository<TemporalData>{
  saveTemporal(temporalData: TemporalData[]): Promise<boolean>;
  removeTemporal(): Promise<boolean>;
}