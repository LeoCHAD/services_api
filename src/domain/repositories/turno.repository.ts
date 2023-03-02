import { TurnoDTO } from "../entities/Turno/turno.dto";
import { Turno } from "../entities/Turno/turno.entity";
import { Repository } from "../shared/repositories/repository.interface";
import { Guid } from "../shared/services/Guid";

export interface TurnoRepository extends Repository<Turno>{
  edit(id: Guid, newData: TurnoDTO): Promise<Turno>;
}
