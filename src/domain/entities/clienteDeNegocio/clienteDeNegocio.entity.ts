import { EntityBase } from "../../shared/entities/EntityBase";
import { Cuenta } from "../cuenta/cuenta.entity"; 
import { Guid } from "../../shared/services/Guid";

export class ClienteDeNegocio extends  EntityBase{
  private name: string;
  private celNumber: number;
  public readonly cuentaId: Guid;

  constructor(id: Guid, name: string, celNumber: number, cuentaId: Guid){
    super(id);
    this.name = name;
    this.celNumber = celNumber;
    this.cuentaId = cuentaId;
  }
}