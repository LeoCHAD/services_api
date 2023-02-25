import { Response, Request } from "express";
import { CuentaUseCases } from "../usecases/cuenta.usecase"; 

export interface CuentaController {
  cuentaUseCase: CuentaUseCases;

  startSession(req: Request, res: Response): void;
  createCuenta(req: Request, res: Response): void;
  editCuenta(req: Request, res: Response): void;
  deleteCuenta(req: Request, res: Response): void;
}
