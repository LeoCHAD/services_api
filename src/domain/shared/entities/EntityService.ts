export abstract class EntityService<T> {
  protected entity: T
  constructor(entity: T){
    this.entity = entity;
  }
}