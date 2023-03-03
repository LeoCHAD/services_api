import { Guid } from "../../shared/services/Guid";
import { Time } from "../../shared/services/Time";

export class TurnoDTO {
  public readonly id?: Guid;
  public readonly duracion?: number;
  public readonly ownerId?: Guid;
  public readonly turnNumber?: number;
  public readonly cretatedAt?: number;
  public readonly waitTime?: number;
}