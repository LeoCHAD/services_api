import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response)=>{
  res.send({status: 200, message: 'HOLA BIENVENIDO'})
})

export { router };
