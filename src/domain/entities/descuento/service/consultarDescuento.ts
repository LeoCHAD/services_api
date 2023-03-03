import { Descuento } from '../../../entities/descuento/descuento.entity';
import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { Time } from '../../../shared/services/Time';
import { ResponseQCliente, ResponseQDescuento } from '../../../shared/utilities/ResponseQ';

export class ConsultarDescuentoService {
  constructor(private repository: DescuentoRepository){}
  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public consultar = async (descuentoId: Guid): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseRemove = await this.repository.consultByDetail({id: descuentoId.id});
      if(responseRemove === null) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.NOT_FOUND);
      return responseRemove[0];
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  };
}