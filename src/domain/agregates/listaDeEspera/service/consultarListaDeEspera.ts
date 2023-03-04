import { Turno } from "../../../entities/turno/turno.entity";
import { TurnoRepository } from "../../../repositories/turno.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { ResponseQListaDeEspera } from "../../../shared/utilities/ResponseQ";

export class ConsultarListaDeEsperaService {
  constructor(private readonly repository: TurnoRepository) {}

  public consultar = async (): Promise<Turno[]> => {
    try {
      const response = await this.repository.consultMany("all");
      if (response === null)
        throw new EntityException<ResponseQListaDeEspera>(
          ResponseQListaDeEspera.IS_EMPTY
        );
      return response;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(
        ResponseQListaDeEspera.ERROR
      );
    }
  };
}
