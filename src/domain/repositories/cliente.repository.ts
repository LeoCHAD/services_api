import { ClienteDTO } from "../entities/cliente/cliente.dto"
import { Cliente } from "../entities/cliente/cliente.entity"
import { Repository } from "../shared/repositories/repository.interface"
import { Guid } from "../shared/services/Guid"

export interface ClienteRepository extends Repository<Cliente>{
  editar: (id: Guid, newData: ClienteDTO)=>{}
}