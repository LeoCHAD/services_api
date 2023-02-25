import { Guid } from "../services/Guid"; 

export interface Repository<T> {
  collection: T[];
  id: Guid;

  /**
   * consulta un item especifico en base uno de sus atributos
   * @param detail - detail de item a consultar
   */
  consultByDetail(detail: {}): Promise<T> | undefined;
  /**
   * consulta una cantidad finita de items, en base a un tamaño de lote
   * @param lotSize - tamaño de lote
   */
  consultMany(lotSize: number): Promise<T[]> | undefined;
  /**
   * edita los datos de un item en base a una entrada nueva de datos
   * @param data - datos nuevos para edición
   */
  edit(id: Guid, newData: T): Promise<T> | undefined;
  /**
   * remueve un item de la colección actual y lo retorna
   * @param id - id de item a remover
   */
  remove(id: Guid): Promise<T> | undefined;
  /**
   * añade un item nuevo a la colección
   * @param item - itempróximo a añadir
   */
  save(item: T): Promise<T> | undefined;
  
}