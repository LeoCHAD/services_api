import { RegistrarTurnoService } from "../../domain/entities/turno/service/registrarTurno";
import { TurnoDTO } from "../../domain/entities/turno/turno.dto";
import { Turno } from "../../domain/entities/turno/turno.entity";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class SolicitarTurnoUseCase {
  constructor(private readonly repository: TurnoRepository){}

  public solicitar = async (data: TurnoDTO): Promise<Turno>=> {
    const turnsRegistered = await this.repository.consultMany('all');
    let generalDuration = 0;
    let amountTurno = 0;
    if(turnsRegistered === null) {
      amountTurno = 1;
      generalDuration = data.duracion!;
    }
    else {
      turnsRegistered.forEach(turno=>{
        generalDuration += turno.waitTime
      })
      amountTurno = turnsRegistered.length + 1;
    }

    const newTurno = new Turno(
      new Guid(), 
      data.ownerId!,
      amountTurno,
      data.duracion!,
      generalDuration
      )
    const registrarTurnoService = new RegistrarTurnoService(newTurno, this.repository);
    const resgisterTurno = await registrarTurnoService.registrar();
    
    return resgisterTurno;
  }
}