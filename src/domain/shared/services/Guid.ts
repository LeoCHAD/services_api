import { v4 as uuid } from "uuid";

export class Guid {
  id: string;
  constructor(){
    this.id = uuid();
  }
}