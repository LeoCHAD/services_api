import { Repository } from "../shared/repositories/repository.interface"; 
import { Notificacion } from "../entities/notificacion/notificacion.entity";

export interface NotificacionRepository extends Repository<Notificacion>{
  
}