import { Descuento } from '../../../entities/descuento/descuento.entity';
import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Time } from '../../../shared/services/Time';
import { ResponseQCliente, ResponseQDescuento } from '../../../shared/utilities/ResponseQ';

export class ConsultarDescuentoService {
  constructor(private repository: DescuentoRepository){}
  /**
   * Remueve  del repositorio el cliente de la instancia actual
   * @returns 
   */
  public consultar = async (): Promise<Descuento[]> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCliente>(ResponseQCliente.OUT_OF_TIME);
      const responseConsult = await this.repository.consultMany('all');
      if(responseConsult === null) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.IS_EMPTY);
      return responseConsult;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCliente>(ResponseQCliente.ERROR);
    }
  };
}