import { Descuento } from '../descuento.entity';
import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQCliente } from '../../../shared/utilities/ResponseQ';

export class RemoverDescuentoService {
  constructor(private repository: DescuentoRepository){}
  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public remover = async (descuentoId: Guid): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseRemove = await this.repository.remove(descuentoId);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  };
}