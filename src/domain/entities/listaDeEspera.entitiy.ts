import { EntityBase } from "../shared/entities/entityBase";
import { Guid } from "../shared/services/Guid";
import { Turno } from "./turno.entity";

export class ListaDeEspera extends EntityBase{
  private turnsOflist: Turno[];
  
  constructor(turnsOflist: Turno[]){
    super(new Guid());
    this.turnsOflist = turnsOflist;
  }
}