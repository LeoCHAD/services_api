import { RemoverTurnoService } from "../../../entities/turno/service/removerTurno";
import { Turno } from "../../../entities/turno/turno.entity";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { Guid } from "../../../shared/services/Guid";

export class RemoverTurnoListaDeEspera {
  constructor(private readonly repository: TurnoRepository){}

   /**
   * Emcargada de remover un turno presente en la lista de espera
   * @param turnoId id de turno a remover
   * @returns
   */
   public removerTurno = async (turnoId: Guid): Promise<Turno> => {
    const serviceRemover = new RemoverTurnoService(this.repository);
    const reposneRemover = await serviceRemover.remover(turnoId);
    return reposneRemover;
  };

}