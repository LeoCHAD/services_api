import { EntityException } from "../../../shared/entities/EntityException";
import { ResponseQListaDeEspera } from "../../../shared/utilities/ResponseQ";
import { Turno } from "../../../entities/turno/turno.entity"; 
import { TurnoRepository } from "../../../repositories/turno.repository";
import { RegistrarTurnoService } from "../../../entities/turno/service/registrarTurno";
import { TurnoDTO } from "../../../entities/turno/turno.dto";
import { Guid } from "../../../shared/services/Guid";

export class AgregarAListaDeEsperaService {
  constructor(private readonly repository: TurnoRepository){}

  /**
   * Agrega un nuevo turno a la lista de espera
   * @param dataTurno
   * @returns 
   */
  public agregar = async (dataTurno: TurnoDTO): Promise<Turno> =>{
    try {
      const turnsRegistered = await this.repository.consultMany('all');
      if(turnsRegistered === null) throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.NOT_FOUND);
      let generalDuration = 0;
      let amountTurno = 0;
      if(turnsRegistered === null) {
        amountTurno = 1;
        generalDuration = dataTurno.duracion!;
      }
      else {
        turnsRegistered.forEach(turno=>{
          generalDuration += turno.waitTime
        })
        amountTurno = turnsRegistered.length + 1;
      }
  
      const newTurno = new Turno(
        new Guid(), 
        dataTurno.ownerId!,
        amountTurno,
        dataTurno.duracion!,
        generalDuration
        )
      const serviceTurnoAgregar = new RegistrarTurnoService(newTurno, this.repository);
      const responseAgregar = await serviceTurnoAgregar.registrar();
      return newTurno;

    } catch (error) {
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }
  }
}