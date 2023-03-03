import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";

export class Cliente extends EntityBase{
  private name: string;

  constructor(id: Guid, name: string){
    super(id);
    this.name = name;
  }
}