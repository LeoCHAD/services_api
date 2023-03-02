import { ClienteDeNegocioRepository } from '../../../repositories/clienteDeNegocio.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQClienteDeNegocio } from '../../../shared/utilities/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ClienteDeNegocio } from '../clienteDeNegocio.entity';
import { ClienteDeNegocioDTO } from '../clienteDeNegocio.dto';

export class EditarClienteDeNegocioService {
  constructor(private readonly repository: ClienteDeNegocioRepository){}
  /**
   * 
   * @param clienteDNId 
   * @param newData 
   * @returns 
   */
  public editar = async (clienteDNId: Guid, newData: ClienteDeNegocioDTO): Promise<ClienteDeNegocio> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(clienteDNId, newData);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
    }
  }; //end method
}