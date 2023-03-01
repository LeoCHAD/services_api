/**
 * Excepción genérica para respuestas de error
 */
export class EntityException<TResponseQ> extends Error {
  constructor(name: TResponseQ,){
    super(name as string);
  }
}
