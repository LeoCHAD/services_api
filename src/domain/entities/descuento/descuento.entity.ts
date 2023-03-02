import { EntityBase } from "../../shared/entities/EntityBase";
import { Guid } from "../../shared/services/Guid";
import { generateToken } from "../../shared/services/handleToken";

export class Descuento extends EntityBase{
  public readonly cuentaId: Guid;
  public codigo: string;
  private readonly expireIn: string = '2d';
  constructor(id: Guid, cuentaId: Guid, percent: number){
    super(id);
    this.cuentaId = cuentaId;
    this.codigo = generateToken({cuentaId, percent, descuentoId: id}, this.expireIn);
  }
}