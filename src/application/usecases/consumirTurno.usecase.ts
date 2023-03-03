import { RemoverTurnoListaDeEspera } from "../../domain/agregates/listaDeEspera/service/removerTurno";
import { TurnoRepository } from "../../domain/repositories/turno.repository";
import { Guid } from "../../domain/shared/services/Guid";

export class ConsumirTurnoUseCase {
  constructor(private readonly repository: TurnoRepository) {}

  public consumir = async (turnoId: Guid): Promise<void> => {
    const removerService = new RemoverTurnoListaDeEspera(this.repository);
    const responseRemover = await removerService.removerTurno(turnoId);
  };
}