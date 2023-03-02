import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";
import { Turno } from "../../entities/Turno/turno.entity";

export class ListaDeEspera {
  private listOfturns: Turno[];
  
  constructor(listOfturns: Turno[]){
    this.listOfturns = listOfturns;
  }
}