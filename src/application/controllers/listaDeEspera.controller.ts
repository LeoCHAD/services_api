import { Response, Request } from "express";

export interface IListaDeEsperaController {
  consultar: (req: Request, res: Response)=> void;
  solicitarTurno: (req: Request, res: Response)=> void;
  cambiarLugarTurno: (req: Request, res: Response)=> void;
  cancelarTurno: (req: Request, res: Response)=> void;
}