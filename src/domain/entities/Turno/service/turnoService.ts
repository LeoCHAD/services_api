import { Turno } from "../turno.entity";

export abstract class TurnoService {
  protected turno: Turno
  constructor(turno: Turno){
    this.turno = turno;
  }
}