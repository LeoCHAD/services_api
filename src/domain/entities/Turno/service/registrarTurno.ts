import { TurnoRepository } from '../../../repositories/turno.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQTurno } from '../../../shared/utilities/ResponseQ';
import { TurnoDTO } from '../turno.dto';
import { Turno } from '../turno.entity';

export class RegistrarTurnoService extends EntityService<Turno> {
  constructor(dataTurno: TurnoDTO, private readonly repository: TurnoRepository){
    super(new Turno(new Guid(), dataTurno.cuentaId!,dataTurno.turnNumber!, dataTurno.duracion!));
  }
  /**
   * Registro de entidad turno a partir de la instancia actual
   * @returns 
   */
  public registrar = async (): Promise<Turno> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQTurno>(ResponseQTurno.OUT_OF_TIME);
      const responseSave = await this.repository.save(this.entity);
      if (!responseSave) throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQTurno>(ResponseQTurno.ERROR);
    }
  }; //end method

}