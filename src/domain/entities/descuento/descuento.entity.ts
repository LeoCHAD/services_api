import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";

export class Descuento extends EntityBase{
  private percent: number
  constructor(id: Guid, percent: number){
    super(id);
  this.percent = percent;
  }
}