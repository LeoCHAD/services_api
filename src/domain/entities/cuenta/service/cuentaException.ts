import {ResponseQCuenta } from '../../../shared/services/ResponseQ'

export class CuentaException extends Error {
  constructor(name: ResponseQCuenta,){
    super(name);
  }
}
