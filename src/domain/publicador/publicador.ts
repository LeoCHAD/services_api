import { Cuenta } from "../cuenta/cuenta";

export interface Publicador extends Cuenta{
  approval: number;
}