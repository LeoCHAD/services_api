import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";
import { Turno } from "../Turno/turno.entity"; 

export class ListaDeEspera extends EntityBase{
  private turnsOflist: Turno[];
  
  constructor(id: Guid, turnsOflist: Turno[]){
    super(id);
    this.turnsOflist = turnsOflist;
  }
}