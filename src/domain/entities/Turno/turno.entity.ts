import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";
import { Time } from "../../shared/services/Time";

export class Turno extends EntityBase{
  public readonly ownerId: Guid;
  public readonly duration: number;
  public readonly turnNumber: number;
  public readonly cretatedAt: number;
  public readonly waitTime: number;

  constructor(id: Guid, ownerId: Guid, turnNumber: number, duracion: number, whaitTime: number) {
    super(id);
    this.ownerId = ownerId;
    this.turnNumber = turnNumber;
    this.duration = duracion;
    this.cretatedAt = Time.getLocalTime().miliseconds;
    this.waitTime = whaitTime;
  }

}