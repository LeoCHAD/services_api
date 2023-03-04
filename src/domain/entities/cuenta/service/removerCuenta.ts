import { CuentaRepository } from "../../../repositories/cuenta.repository";
import { EntityException } from "../../../shared/entities/EntityException";
import { Guid } from "../../../shared/services/Guid";
import { Time } from "../../../shared/services/Time";
import { ResponseQCuenta } from "../../../shared/utilities/ResponseQ";
import { Cuenta } from "../cuenta.entity";

export class RemoverCuentaService {
  constructor(private readonly cuentaRepository: CuentaRepository) {}
  /**
   * Remueve  del repositorio la instancia actual de la entidad
   * @returns
   */
  public remover = async (cuentaId: Guid): Promise<Cuenta> => {
    try {
      if (!Time.isOnTimeVerify())
        throw new EntityException<ResponseQCuenta>(ResponseQCuenta.OUT_OF_TIME);

      const responseRemove = await this.cuentaRepository.remove(cuentaId);
      return responseRemove;
    } catch (error) {
      console.error(error);
      throw new EntityException<ResponseQCuenta>(ResponseQCuenta.ERROR);
    }
  };
}
