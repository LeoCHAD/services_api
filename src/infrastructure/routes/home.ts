import { Response, Request, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response)=>{
  res.send('HOLA HOME')
})
router.get('/epa', (req: Request, res: Response)=>{
  res.send('HOLA EPA')
})

export {router};