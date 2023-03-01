import { ClienteRepository } from '../../../repositories/cliente.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQCliente } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Cliente } from '../cliente.entity';

export class CrearClienteService extends EntityService<Cliente> {
  constructor(cliente: Cliente, private repository: ClienteRepository){
    super(cliente);
  }
  
  /**
   * Registro de entidad cuenta a partir de la instancia actual
   * @returns 
   */
  public crearCliente = async (): Promise<Cliente> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseCliente = await this.repository.consultByDetail({
        id: this.entity.id
      });
      if (responseCliente !== null) throw new EntityException<ResponseQCliente>(ResponseQCliente.ALREADY_EXIST);
      const responseSave = await this.repository.save(this.entity);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  }; //end method
}