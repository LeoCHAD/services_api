import { DescuentoRepository } from '../../../repositories/descuento.repository';
import { EntityException } from '../../../shared/entities/EntityException';
import { EntityService } from '../../../shared/entities/EntityService';
import { ResponseQCuenta, ResponseQDescuento } from '../../../shared/utilities/ResponseQ';
import { Time } from '../../../shared/services/Time';
import { Descuento } from '../descuento.entity';
import { Guid } from '../../../shared/services/Guid';
import { DescuentoDTO } from '../descuento.dto';


export class RegistrarDescuentoService extends EntityService<Descuento> {
  constructor(dataDescuento: DescuentoDTO, private repository: DescuentoRepository){
    super(new Descuento(new Guid(), dataDescuento.cuentaId, dataDescuento.percent!));
  }
  /**
   * Registro de entidad descuenta a partir de la instancia actual
   * @returns
   */
  public registrar = async (): Promise<Descuento> => {
    try {
      if (!Time.isOnTimeVerify()) throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);
      
      const responseDescuento = await this.repository.consultByDetail({
        id: this.entity.id.id,
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