import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { verifyToken } from '../../../shared/services/handleToken';
import { Time } from '../../../shared/services/Time';
import { ResponseQDescuento } from '../../../shared/utilities/ResponseQ';
import { RemoverDescuentoService } from './removerCliente';

export class ConsumirDescuentoService{ 
  constructor(private readonly repository: DescuentoRepository){}
  /**
   * 
   * @returns
   */
  public consumir = async (descuentoId: Guid): Promise<boolean> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.OUT_OF_TIME);
      
      const responseDescuento = await this.repository.consultByDetail({
        id: descuentoId.id,
      });
      if (responseDescuento === null)
        throw new EntityException<ResponseQDescuento>(
          ResponseQDescuento.NOT_FOUND
        );

      const verified = verifyToken(responseDescuento[0].codigo);
      const removerService = new RemoverDescuentoService(this.repository);
      const response = await removerService.remover(descuentoId);

      return verified;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ERROR);
    }
  }; //end method
}