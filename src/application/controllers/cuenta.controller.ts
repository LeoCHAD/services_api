import { Response, Request } from "express";

export interface CuentaController {
  startSession(req: Request, res: Response): void;
  createCuenta(req: Request, res: Response): void;
  editCuenta(req: Request, res: Response): void;
  deleteCuenta(req: Request, res: Response): void;
}
