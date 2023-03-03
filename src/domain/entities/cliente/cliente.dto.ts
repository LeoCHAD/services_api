import { Guid } from "../../shared/services/Guid";

export class ClienteDTO {
  constructor(
    public readonly id?: Guid,
    public readonly name: string = '',
  ) {}
}
