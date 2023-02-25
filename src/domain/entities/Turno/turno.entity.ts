import { EntityBase } from "../../shared/entities/entityBase";
import { Guid } from "../../shared/services/Guid"; 

export class Turno extends EntityBase {
  private cretatedAt: number;
  private turnNumber: number;

  constructor(turnNumber: number) {
    super(new Guid());
    this.turnNumber = turnNumber;
    this.cretatedAt = new Date().getTime();
  }
}