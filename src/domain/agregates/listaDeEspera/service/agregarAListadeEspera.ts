import { EntityException } from "../../../shared/entities/EntityException";
import { ResponseQListaDeEspera } from "../../../shared/utilities/ResponseQ";
import { Turno } from "../../../entities/Turno/turno.entity"; 
import { TurnoRepository } from "../../../repositories/turno.repository";

export class AgregarAListaDeEsperaService {
  constructor(private readonly repository: TurnoRepository){}

  /**
   * Agrega un nuevo turno a la lista de espera
   * @param turno 
   * @returns 
   */
  public agregar = async (turno: Turno): Promise<boolean> =>{
    try {
      const responseAgregar = await this.repository.save(turno);
      return true;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }
  }
}