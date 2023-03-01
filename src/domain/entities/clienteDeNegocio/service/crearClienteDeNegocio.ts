import { ClienteDeNegocioRepository } from '../../../repositories/clienteDeNegocio.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQClienteDeNegocio } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ClienteDeNegocio } from '../clienteDeNegocio.entity';

export class CrearClienteDeNegocioService extends EntityService<ClienteDeNegocio> {
  constructor(clienteDeNegocio: ClienteDeNegocio, private repository: ClienteDeNegocioRepository){
    super(clienteDeNegocio);
  }

public crearClienteDeNegocio = async (): Promise<ClienteDeNegocio> => {
  try {
    if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.OUT_OF_TIME);
    const responseClienteDeNegocio = await this.repository.consultByDetail({
      id: this.entity.id
    });
    if(responseClienteDeNegocio !== null) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ALREADY_EXIST);
    const responseSave = await this.repository.save(this.entity);
    if (!responseSave) throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
    return responseSave;
  } catch (error) {
    console.error(error);
    throw new EntityException<ResponseQClienteDeNegocio>(ResponseQClienteDeNegocio.ERROR);
  }
}; //end method

}
