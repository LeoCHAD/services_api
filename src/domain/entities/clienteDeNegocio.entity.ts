import { EntityBase } from "../shared/entities/entityBase";
import { Cuenta } from "./cuenta.entity";
import { Guid } from "../shared/services/Guid";

export class ClienteDeNegocio extends  EntityBase{
  private name: string;
  private celNumber: number;
  private cuenta: Cuenta;

  constructor(name: string, celNumber: number, cuenta: Cuenta){
    super(new Guid());
    this.name = name;
    this.celNumber = celNumber;
    this.cuenta = cuenta;

  }
}