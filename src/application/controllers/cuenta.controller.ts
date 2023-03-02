import { Response, Request } from "express";

export interface ICuentaController {
  iniciarSession(req: Request, res: Response): void;
  rgistrarCuenta(req: Request, res: Response): void;
  editarCuenta(req: Request, res: Response): void;
  borrarCuenta(req: Request, res: Response): void;
}
