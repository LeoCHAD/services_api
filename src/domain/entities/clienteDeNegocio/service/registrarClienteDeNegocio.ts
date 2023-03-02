import { ClienteDeNegocioRepository } from "../../../repositories/clienteDeNegocio.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { EntityService } from "../../../shared/entities/EntityService";
import { ResponseQClienteDeNegocio } from "../../../shared/utilities/ResponseQ";
import { Time } from "../../../shared/services/Time";
import { ClienteDeNegocio } from "../clienteDeNegocio.entity";
import { ClienteDeNegocioDTO } from "../clienteDeNegocio.dto";
import { Guid } from "../../../shared/services/Guid";

export class RegistrarClienteDeNegocioService extends EntityService<ClienteDeNegocio> {
  constructor(
    dataClienteDeNegocio: ClienteDeNegocioDTO,
    private readonly repository: ClienteDeNegocioRepository
  ) {
    super(
      new ClienteDeNegocio(
        new Guid(),
        dataClienteDeNegocio.name,
        dataClienteDeNegocio.celNumber,
        dataClienteDeNegocio.cuenta
      )
    );
  }

  public registrar = async (): Promise<ClienteDeNegocio> => {
    try {
      if (!Time.isOnTimeVerify())
        throw new EntityException<ResponseQClienteDeNegocio>(
          ResponseQClienteDeNegocio.OUT_OF_TIME
        );
      const responseClienteDeNegocio = await this.repository.consultByDetail({
        id: this.entity.id,
      });
      if (responseClienteDeNegocio !== null)
        throw new EntityException<ResponseQClienteDeNegocio>(
          ResponseQClienteDeNegocio.ALREADY_EXIST
        );
      const responseSave = await this.repository.save(this.entity);
      if (!responseSave)
        throw new EntityException<ResponseQClienteDeNegocio>(
          ResponseQClienteDeNegocio.ERROR
        );
      return responseSave;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQClienteDeNegocio>(
        ResponseQClienteDeNegocio.ERROR
      );
    }
  }; //end method
}
