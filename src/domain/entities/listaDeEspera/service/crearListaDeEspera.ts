import { ListaDeEsperaRepository } from '../../../repositories/listaDeEspera.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQListaDeEspera } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { ListaDeEspera } from '../listaDeEspera.entitiy';


export class CrearListaDeEsperaService extends EntityService<ListaDeEspera> {
  constructor(listaDeEspera: ListaDeEspera, private repository: ListaDeEsperaRepository){
    super(listaDeEspera);
  }

  /**
   * Registrar entidad ListaDeEspera a partir de la intancia actual
   * @returns 
   */
  public crearListaDeEspera = async (): Promise<ListaDeEspera> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.OUT_OF_TIME);
      
      const responseSave = await this.repository.save(this.entity);
      if (!responseSave) throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQListaDeEspera>(ResponseQListaDeEspera.ERROR);
    }
  }; //end method
}