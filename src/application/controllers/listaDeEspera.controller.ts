import { Response, Request } from "express";

export interface IListaDeEsperaController {
  consultar(req: Request, res: Response): void;
  solicitarTurno(req: Request, res: Response): void;
  cambiarTurno(req: Request, res: Response): void;
  cancelarTurno(req: Request, res: Response): void;
  agregarTurno(req: Request, res: Response): void;
}
