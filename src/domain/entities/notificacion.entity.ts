import { EntityBase } from "../shared/entities/entityBase";
import { Guid } from "../shared/services/Guid";

export class Notificacion extends EntityBase{
  private evento: string;
  
  constructor(evento: string){
    super(new Guid);
    this.evento = evento
  }
}