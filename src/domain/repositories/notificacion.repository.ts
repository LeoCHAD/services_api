import { Repository } from "../shared/reposirories/repository.interface"; 
import { Notificacion } from "../entities/notificacion.entity";

export interface NotificacionRepository extends Repository<Notificacion>{
  
}