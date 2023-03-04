import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQTurno } from '../../../shared/utilities/ResponseQ';
import { TurnoDTO } from '../turno.dto';
import { Turno } from '../turno.entity';

export class EditarTurnoService {
  constructor(private readonly repository: TurnoRepository){}
  
  /**
   * Modifica los datos de turno identificado con el id con los datos actualmente 
   * instanciados
   * @param id 
   * @returns 
   */
  public editar = async (id: Guid, newData: TurnoDTO): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, newData);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  }; //end method
  /**
   * Modifica los datos de turno identificado con el id con los datos actualmente 
   * instanciados
   * @param id 
   * @returns 
   */
  public editarPorLote = async (id: Guid): Promise<number> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.editForLote(id);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  }; //end method
}