import { Repository } from "../shared/reposirories/repository.interface"; 
import { Cliente } from "../entities/cliente.entity"; 

export interface ClienteRepository extends Repository<Cliente>{

}