export interface Repository<T> {
  collection: Array<T>;
  id: string;

  /**
   * consulta un item especifico en base a su id
   * @param id - id de item a consultar
   */
  consultOne(id: string): T;
  /**
   * consulta una cantidad finita de items, en base a un tamaño de lote
   * @param lotSize - tamaño de lote
   */
  consultMany(lotSize: number): T[];
  /**
   * edita los datos de un item en base a una entrada nueva de datos
   * @param data - datos nuevos para edición
   */
  edit(data: T): T;
  /**
   * remueve un item de la colección actual y lo retorna
   * @param id - id de item a remover
   */
  remove(id: string): T;
  /**
   * añade un item nuevo a la colección
   * @param item - itempróximo a añadir
   */
  add(item: T): T;
  
}