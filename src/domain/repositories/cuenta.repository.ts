import { Cuenta } from "../entities/cuenta/cuenta.entity";
import { Repository } from "../shared/repositories/repository.interface";

export interface CuentaRepository extends Repository<Cuenta>{

}