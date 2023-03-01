import { RegistrarTurnoService } from "../../domain/entities/Turno/service/registrarTurno";
import { RemoverTurnoService } from "../../domain/entities/Turno/service/removerTurno";
import { Turno } from "../../domain/entities/Turno/turno.entity";
import { TurnoRepository } from "../../domain/repositories/turno.repository";

export class SolicitarTurno {
  constructor(private readonly repository: TurnoRepository){}

  public solicitar = async (turno: Turno): Promise<Turno>=> {
    //guardamos la instancia de turno en el repositorio con el 
    //servicio registrarTurno
    const registrarTurnoService = new RegistrarTurnoService(turno, this.repository);
    const newTurno = await registrarTurnoService.crearTurno();

    //debido a que la entidad turno tiene un evento asociado llamado turnocompleto
    //propio de su ciclo de vida, lo observamos con el sericio removerturno, para 
    //retirarlo del repositorio
    const removerObserver = new RemoverTurnoService(turno, this.repository);
    turno.subscribeOnComplete(removerObserver);
    
    //retorno de control
    return newTurno;
  }
}