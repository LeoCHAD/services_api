import { v4 as uuid } from "uuid";

/**
 * clase genradora de id unicos para cada entidad que lo requiera
 */
export class Guid {
  public readonly id: string;
  constructor(){
    this.id = uuid();
  }
}