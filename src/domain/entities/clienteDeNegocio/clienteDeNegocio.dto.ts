import { Guid } from "../../shared/services/Guid";
import { Cuenta } from "../cuenta/cuenta.entity";

export class ClienteDeNegocioDTO {
  constructor(
    public readonly id?: Guid,
    public readonly name: string = '',
    public readonly celNumber: number = 0,
    public readonly cuenta: Cuenta = new Cuenta(new Guid(), '','')
  ) {}
}
