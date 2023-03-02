import { Guid } from "../../shared/services/Guid";

export class TurnoDTO {
  public readonly id?: Guid;
  public readonly duracion?: number;
  public readonly cuentaId?: Guid;
  public readonly turnNumber?: number;
  public readonly cretatedAt?: number;
}