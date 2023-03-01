import { Repository } from "../shared/repositories/repository.interface"; 
import { Cliente } from "../entities/cliente/cliente.entity"; 

export interface ClienteRepository extends Repository<Cliente>{

}