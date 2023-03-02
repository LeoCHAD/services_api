import { Guid } from "../../shared/services/Guid";

export class DescuentoDTO {
  constructor(
    public readonly id?: Guid,
    public readonly codigo?: string,
    public readonly percent?: number,
    public readonly cuentaId: Guid = new Guid(),
  ){}
}