import { RegistrarTurnoService } from "../../domain/entities/Turno/service/registrarTurno";
import { TurnoDTO } from "../../domain/entities/Turno/turno.dto";
import { Turno } from "../../domain/entities/Turno/turno.entity";
import { TurnoRepository } from "../../domain/repositories/turno.repository";

export class SolicitarTurno {
  constructor(private readonly repository: TurnoRepository){}

  public solicitar = async (data: TurnoDTO): Promise<Turno>=> {
    const registrarTurnoService = new RegistrarTurnoService(data, this.repository);
    const newTurno = await registrarTurnoService.registrar();
    
    return newTurno;
  }
}