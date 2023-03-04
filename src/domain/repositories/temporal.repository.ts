import { Repository } from "../shared/repositories/repository.interface";

export type TemporalData = {[key: string]: number}

export interface TurnNumberTemporalRepository extends Repository<TemporalData>{
  saveTemporal(temporalData: TemporalData[]): Promise<boolean>;
  removeTemporal(): Promise<boolean>;
}

export interface WaitTimeTemporalRepository extends Repository<TemporalData>{
  saveTemporal(temporalData: TemporalData[]): Promise<boolean>;
  removeTemporal(): Promise<boolean>;
}
