import { EntityBase } from "../../shared/entities/EntityBase";
import { Cuenta } from "../cuenta/cuenta.entity"; 
import { Guid } from "../../shared/services/Guid";

export class ClienteDeNegocio extends  EntityBase{
  private name: string;
  private celNumber: number;
  private cuenta: Cuenta;

  constructor(id: Guid, name: string, celNumber: number, cuenta: Cuenta){
    super(id);
    this.name = name;
    this.celNumber = celNumber;
    this.cuenta = cuenta;
  }
}