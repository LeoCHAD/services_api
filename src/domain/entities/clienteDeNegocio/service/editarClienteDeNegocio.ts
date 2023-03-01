import { ClienteDeNegocioRepository } from '../../../repositories/clienteDeNegocio.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQClienteDeNegocio } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ClienteDeNegocio } from '../clienteDeNegocio.entity';

export class EditarClienteDeNegocioService extends EntityService<ClienteDeNegocio> {
  constructor(clienteDeNegocio: ClienteDeNegocio, private repository: ClienteDeNegocioRepository){
    super(clienteDeNegocio);
  }
  /**
   * Modifica el ciente de negocio identificado con el id, con la 
   * información de la instancia actual
   * @param id 
   * @returns 
   */
  public editarClienteDeNegocio = async (id: Guid): Promise<ClienteDeNegocio> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
    }
  }; //end method
}