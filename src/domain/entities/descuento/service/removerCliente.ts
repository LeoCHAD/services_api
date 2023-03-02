import { Descuento } from '../../../entities/descuento/descuento.entity';
import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Time } from '../../../shared/services/Time';
import { ResponseQCliente } from '../../../shared/utilities/ResponseQ';

export class RemoverDescuentoService extends EntityService<Descuento> {
  constructor(descuento: Descuento, private repository: DescuentoRepository){
    super(descuento);
  }
  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public remover = async (): Promise<Descuento> => {
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