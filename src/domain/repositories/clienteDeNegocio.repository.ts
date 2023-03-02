import { ClienteDeNegocioDTO } from "../entities/clienteDeNegocio/clienteDeNegocio.dto";
import { ClienteDeNegocio } from "../entities/clienteDeNegocio/clienteDeNegocio.entity";
import { Repository } from "../shared/repositories/repository.interface";
import { Guid } from "../shared/services/Guid";

export interface ClienteDeNegocioRepository extends Repository<ClienteDeNegocio>{
  editar: (id: Guid, newData: ClienteDeNegocioDTO)=>{}
}