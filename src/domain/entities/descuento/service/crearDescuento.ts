import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQDescuento } from '../../../shared/services/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Descuento } from '../descuento.entity';


export class CrearDescuentoService extends EntityService<Descuento> { 
  constructor(descuento: Descuento, private repository: DescuentoRepository){
    super(descuento);
  }
  /**
   * Registro de entidad Descuento a partir de la instancia actual
   * @returns
   */
  public crearDescuento = async (): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.OUT_OF_TIME);
      
      const responseDescuento = await this.repository.consultByDetail({
        user: this.entity.id,
      });
      if (responseDescuento !== null) throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ALREADY_EXIST);
      const responseSave = await this.repository.save(this.entity);
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQDescuento>(ResponseQDescuento.ERROR);
    }
  }; //end method

}