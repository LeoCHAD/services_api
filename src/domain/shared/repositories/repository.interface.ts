import { Guid } from "../services/Guid"; 

export interface Repository<T> {
  collectionName: string;
  id: Guid;

  /**
   * consulta un item especifico en base uno de sus atributos
   * @param detail - detail de item a consultar
   */
  consultByDetail(detail: any): Promise<T[] | null> ;
  /**
   * consulta una cantidad finita de items, en base a un tamaño de lote
   * @param lotSize - tamaño de lote
   */
  consultMany(lotSize: number | string): Promise<T[] | null>;
  /**
   * edita los datos de un item en base a una entrada nueva de datos, este
   * método está sujeto a ser sobreescrito al heredarse para especificar
   * el tip de dato en newData
   * @param newData - datos nuevos para edición
   * @param id - id del item a editar
   */
  edit(id: Guid, newData: any): Promise<T>;
  /**
   * remueve un item de la colección actual y lo retorna
   * @param id - id de item a remover
   */
  remove(id: Guid): Promise<T>;
  /**
   * añade un item nuevo a la colección
   * @param item - itempróximo a añadir
   */
  save(item: T): Promise<T>;
  
}