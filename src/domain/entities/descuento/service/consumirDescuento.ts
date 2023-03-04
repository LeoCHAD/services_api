import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { Guid } from '../../../shared/services/Guid';
import { verifyToken } from '../../../shared/services/handleToken';
import { Time } from '../../../shared/services/Time';
import { ResponseQDescuento } from '../../../shared/utilities/ResponseQ';
import { RemoverDescuentoService } from './removerDescuento';

export class ConsumirDescuentoService{ 
  constructor(private readonly repository: DescuentoRepository){}
  /**
   * encargada de verificar el token de descuento y removerlo de repositorio 
   * en caso de ser válido
   * @returns true es un token váslido y false inválido
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