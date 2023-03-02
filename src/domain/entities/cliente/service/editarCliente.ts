import { ClienteRepository } from "../../../repositories/cliente.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { Guid } from "../../../shared/services/Guid";
import { Time } from "../../../shared/services/Time";
import { ResponseQCliente } from "../../../shared/utilities/ResponseQ";
import { ClienteDTO } from "../cliente.dto";
import { Cliente } from "../cliente.entity";

export class EditarClienteService {
  constructor(private readonly repository: ClienteRepository) {}

  public editar = async (
    cuentaId: Guid,
    newData: ClienteDTO
  ): Promise<Cliente> => {
    try {
      if (!Time.isOnTimeVerify())
        throw new EntityException<ResponseQCliente>(
          ResponseQCliente.OUT_OF_TIME
        );
      const responseEdit = await this.repository.edit(cuentaId, newData);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  }; //end method
}
