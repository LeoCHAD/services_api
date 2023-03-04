import { Response, Request } from "express";

export interface ICuentaController {
  iniciarSesion: (req: Request, res: Response)=> void;
  registrar: (req: Request, res: Response)=> void;
  editar: (req: Request, res: Response)=> void;
  eliminar: (req: Request, res: Response)=> void;
}
