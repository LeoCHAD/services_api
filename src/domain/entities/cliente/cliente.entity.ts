import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";

export class Cliente extends EntityBase{
  private name: string;
  private celNumber: number;

  constructor(id: Guid, name: string, celNumber: number){
    super(id);
    this.name = name;
    this.celNumber = celNumber;
  }
}