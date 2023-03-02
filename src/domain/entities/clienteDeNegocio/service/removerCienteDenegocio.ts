import { ClienteDeNegocioRepository } from '../../../repositories/clienteDeNegocio.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQClienteDeNegocio } from '../../../shared/utilities/ResponseQ';
import { ClienteDeNegocio } from '../clienteDeNegocio.entity';

export class RemoverClienteDeNegocioService {
  constructor(private repository: ClienteDeNegocioRepository){}

  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @param clienteDNId
   * @returns 
   */
  public remover = async (clienteDNId: Guid): Promise<ClienteDeNegocio> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.OUT_OF_TIME);
      const responseRemove = await this.repository.remove(clienteDNId);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
    }
  };
}