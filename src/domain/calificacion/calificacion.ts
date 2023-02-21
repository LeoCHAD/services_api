export class Calificacion{
  private publisherId: string;
  private value: number;

  constructor(value: number, pId: string){
    this.value = value;
    this.publisherId = pId;
  }
}
