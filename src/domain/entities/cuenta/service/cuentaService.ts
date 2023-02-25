import { Cuenta } from "../cuenta.entity";

export abstract class CuentaService {
  protected cuenta: Cuenta
  constructor(cuenta: Cuenta){
    this.cuenta = cuenta;
  }
}