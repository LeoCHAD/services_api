import { ClienteRepository } from '../../../repositories/cliente.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQCliente } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cliente } from '../cliente.entity';

export class EditarClienteService extends EntityService<Cliente> {
  constructor(cliente: Cliente, private repository: ClienteRepository){
    super(cliente);
  }

  public editarCliente = async (id: Guid): Promise<Cliente> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  }; //end method

}