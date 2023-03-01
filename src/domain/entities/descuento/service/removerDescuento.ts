import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQDescuento } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Descuento } from '../descuento.entity';

export class RemoverDescuentoService extends EntityService<Descuento> {
  
  constructor(descuento: Descuento, private repository: DescuentoRepository){
    super(descuento);//los datos completos de cuenta no es requerida en el presente servicio
  }

  /**
   * Remueve descuento del repositorio la instancia actual de la entidad
   * @returns 
   */
  public removerCuenta = async (): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.OUT_OF_TIME);
      
      const responseEdit = await this.repository.remove(this.entity.id);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ERROR);
    }
  };
}