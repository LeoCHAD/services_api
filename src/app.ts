import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { RouterExpressCustom } from './router';

const app = express();
const routerApp = new RouterExpressCustom(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//levantamiento de rutas
routerApp.setUp('src/infrastructure/routes')
  .then((routes)=>console.log('::RUTAS ESTABLECIDAS ==>', routes))

app.listen(PORT, ()=>{
  console.log(`::APP SERVIDA POR EL PUERTO ${PORT}::`);
});