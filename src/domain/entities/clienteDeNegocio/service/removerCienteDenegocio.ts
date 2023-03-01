import { ClienteDeNegocioRepository } from '../../../repositories/clienteDeNegocio.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQClienteDeNegocio } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ClienteDeNegocio } from '../clienteDeNegocio.entity';

export class RemoverClienteService extends EntityService<ClienteDeNegocio> {
  constructor(cliente: ClienteDeNegocio, private repository: ClienteDeNegocioRepository){
    super(cliente);
  }

  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public removerCliente = async (): Promise<ClienteDeNegocio> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.OUT_OF_TIME);
      const responseRemove = await this.repository.remove(this.entity.id);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
    }
  };
}