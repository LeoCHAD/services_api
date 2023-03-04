import { Guid } from "../../shared/services/Guid";

export class CuentaDTO {
  constructor(
    public readonly id?: Guid,
    public readonly email: string = '',
    public readonly password: string = ''
  ) {}
}
