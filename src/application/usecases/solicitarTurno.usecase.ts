import { AgregarAListaDeEsperaService } from "../../domain/agregates/listaDeEspera/service/agregarAListadeEspera";
import { TurnoDTO } from "../../domain/entities/turno/turno.dto";
import { Turno } from "../../domain/entities/turno/turno.entity";
import { TurnoRepository } from "../../domain/repositories/turno.repository";

export class SolicitarTurnoUseCase {
  constructor(private readonly repositoryTurno: TurnoRepository) {}

  public solicitar = async (data: TurnoDTO): Promise<Turno> => {
    const registrarTurnoService = new AgregarAListaDeEsperaService(
      this.repositoryTurno
    );
    const resgisterTurno = await registrarTurnoService.agregar(data);

    return resgisterTurno;
  };
}
