import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { Guid } from '../../../shared/services/Guid';
import { ResponseQDescuento } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Descuento } from '../descuento.entity';

export class EditarDescuentoService extends EntityService<Descuento> {
  constructor(descuento: Descuento, private repository: DescuentoRepository){
    super(descuento);
  }

  /**
   * Modificar información de entidad cuenta almacenada en repositorio
   * @param id 
   * @returns 
   */
  public editarCuenta = async (id: Guid): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.OUT_OF_TIME);
      const responseEdit = await this.repository.edit(id, this.entity);
      if (!responseEdit) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ERROR);
      return responseEdit;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ERROR);
    }
  }; //end method

}