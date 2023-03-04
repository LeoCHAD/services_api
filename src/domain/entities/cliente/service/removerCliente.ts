import { ClienteRepository } from '../../../repositories/cliente.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQCliente } from '../../../shared/utilities/ResponseQ';
import { Cliente } from '../cliente.entity';

export class RemoverClienteService {
  constructor(private readonly repository: ClienteRepository){}

  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public remover = async (clienteId: Guid): Promise<Cliente> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseRemove = await this.repository.remove(clienteId);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  };
}