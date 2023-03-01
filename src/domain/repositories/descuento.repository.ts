import { Descuento } from "../entities/descuento/descuento.entity";
import { Repository } from "../shared/repositories/repository.interface";

export interface DescuentoRepository extends Repository<Descuento>{
  
}