import { TurnoDTO } from "../entities/turno/turno.dto";
import { Turno } from "../entities/turno/turno.entity";
import { Repository } from "../shared/repositories/repository.interface";
import { Guid } from "../shared/services/Guid";

export interface TurnoRepository extends Repository<Turno>{
  edit(id: Guid, newData: TurnoDTO): Promise<Turno>;
  editForLote(id: Guid): Promise<number>
  removeForLote(id: Guid): Promise<number>
}