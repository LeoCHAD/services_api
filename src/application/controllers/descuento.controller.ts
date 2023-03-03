import { Request, Response } from "express";

export interface IDescuentoCOntroller {
  consultar: (req: Request, res: Response)=>void;
  solicitar: (req: Request, res: Response)=>void;
  consumir: (req: Request, res: Response)=>void;
}