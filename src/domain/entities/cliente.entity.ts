import { EntityBase } from "../shared/entities/entityBase";
import { Guid } from "../shared/services/Guid";

export class Cliente extends EntityBase{
  private name: string;
  private celNumber: number;

  constructor(name: string, email: number){
    super(new Guid());
    this.name = name;
    this.celNumber = email;
  }
}