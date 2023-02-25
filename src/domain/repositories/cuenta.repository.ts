import { Repository } from "../shared/reposirories/repository.interface"; 
import { Cuenta } from "../entities/cuenta/cuenta.entity"; 

export interface CuentaRepository extends Repository<Cuenta>{
  
}