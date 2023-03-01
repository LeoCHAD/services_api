import { ClienteRepository } from '../../../repositories/cliente.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQCliente } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cliente } from '../cliente.entity';

export class RemoverClienteService extends EntityService<Cliente> {
  constructor(cliente: Cliente, private repository: ClienteRepository){
    super(cliente);
  }

  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public removerCliente = async (): Promise<Cliente> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseRemove = await this.repository.remove(this.entity.id);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  };
}