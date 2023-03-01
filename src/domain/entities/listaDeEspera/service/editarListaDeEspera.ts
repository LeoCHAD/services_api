import { ListaDeEsperaRepository } from '../../../repositories/listaDeEspera.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQListaDeEspera } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ListaDeEspera } from '../listaDeEspera.entitiy';


export class EditarListaDeEsperaService extends EntityService<ListaDeEspera> {
  constructor(listaDeEspera: ListaDeEspera, private repository: ListaDeEsperaRepository){
    super(listaDeEspera);
  }
  /**
   * Modificar información de entidad cuenta almacenada en repositorio
   * @param id 
   * @returns 
   */
  public editarListaDeEspera = async (id: Guid): Promise<ListaDeEspera> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      if (!responseEdit) throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }
  }; //end method

}