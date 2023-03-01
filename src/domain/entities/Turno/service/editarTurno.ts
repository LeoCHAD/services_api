import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQTurno } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Turno } from '../turno.entity';

export class EditarTurnoService extends EntityService<Turno> {
  constructor(turno: Turno, private repository: TurnoRepository){
    super(turno);
  }
  
  /**
   * Modifica los datos de turno identificado con el id con los datos actualmente 
   * instanciados
   * @param id 
   * @returns 
   */
  public editarTurno = async (id: Guid): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      if (!responseEdit) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  }; //end method

}