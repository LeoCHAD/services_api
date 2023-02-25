import {ResponseQTurno } from '../../../shared/services/ResponseQ'

export class TurnoException extends Error {
  constructor(name: ResponseQTurno,){
    super(name);
  }
}
