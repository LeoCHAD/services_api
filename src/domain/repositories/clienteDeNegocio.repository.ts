import { Repository } from "../shared/reposirories/repository.interface"; 
import { ClienteDeNegocio } from "../entities/clienteDeNegocio.entity";

export interface ClienteRepository extends Repository<ClienteDeNegocio>{

}