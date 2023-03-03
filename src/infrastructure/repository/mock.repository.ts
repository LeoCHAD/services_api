import { Turno } from "../../domain/entities/turno/turno.entity";
import { Repository } from "../../domain/shared/repositories/repository.interface";
import { Guid } from "../../domain/shared/services/Guid";

export class MockRepository<T> implements Repository<T>{
  collection: T[] = [];
  id: Guid = new Guid();
  consultByDetail(detail: any): Promise<T> | null {
    throw new Error("Method not implemented.");
  }
  consultMany = async (lotSize: string | number): Promise<T[] | null> => {
    throw new Error("Method not implemented.");
  }
  edit(id: Guid, newData: any): Promise<T> {
    throw new Error("Method not implemented.");
  }
  remove(id: Guid): Promise<T> {
    throw new Error("Method not implemented.");
  }
  save = async (item: T): Promise<T> => {
    return item;
  }
  

}