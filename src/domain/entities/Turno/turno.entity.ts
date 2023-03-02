import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";

export class Turno extends EntityBase{
  public readonly cuentaId: Guid;
  public readonly duration: number;
  public readonly turnNumber: number;
  public readonly cretatedAt: number;

  constructor(id: Guid, cuentaId: Guid, turnNumber: number, duracion: number) {
    super(id);
    this.cuentaId = cuentaId;
    this.turnNumber = turnNumber;
    this.duration = duracion;
    this.cretatedAt = new Date().getTime();
  }

}