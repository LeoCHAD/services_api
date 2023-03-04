import { Turno } from "../../entities/turno/turno.entity";

export class ListaDeEspera {
  private listOfturns: Turno[];
  
  constructor(listOfturns: Turno[]){
    this.listOfturns = listOfturns;
  }
}