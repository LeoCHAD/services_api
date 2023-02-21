import { Application, Router } from "express";
import fs from "fs";
import path from "path";
import { Route } from "../interfaces/route.interface";

/**
 *Clase encargadad de administrar las rutas
 @member Router
 @member app: Application
 @method setUp
 */
export class RouterExpressCustom {
  private router: Router;
  private app: Application;
  constructor(app: Application) {
    this.app = app;
    this.router = Router();
  }

  /**
   * Realiza una lectura de ficheros en busca de
   * un router con rutas declaradas para incorporarlas
   * a la aplicación.
   *
   * @param routesPath - ruta donde están alojados los ficheros de ruta
   */
  public setUp = async (routesPath: string): Promise<Route[]> => {
    try {
      let routes: Route[] = [];
      const routesDir = path.resolve(routesPath);
      const files = fs.readdirSync(routesDir);
      for (let file of files) {
        const filePath = path.join(routesDir, file);
        // filtramos el fichero principal => router.ts
        if (file === "router.ts") continue;
        if (file.endsWith(".ts")) {
          //obtenemos el nombre del fichero
          const nameFile = file.replace('.ts','')
          const name = nameFile !== 'index' ? `/${nameFile}` : '/';
          routes.push({path: name});
          //importamos el modulo del fichero concretamente mnos interesa el router
          const routeModule = await import(filePath);
          const { router } = routeModule;
          //lo incorporamos al router principal y este a su véz, a la app
          this.router.use(`${name}`, router);
          this.app.use(this.router);
        } //end if
        else{
          break;
        }
      } //end for
      return routes;
    } catch (error) {
      console.log('ERROR AL ESTABLECER RUTAS ')
      return [];
    }
  
  };//end method

}



// import { readdirSync } from "fs";
// const router: Router = Router();

// const PATH_ROUTES = __dirname;

// function removeExtension(fileName: string): string {
//   const cleanFileName = <string>fileName.split(".").shift();
//   return cleanFileName;
// }

// /**
//  *
//  * @param file tracks.ts
//  */
// function loadRouter(file: string): void {
//   const name = removeExtension(file);
//   if (name !== "index") {
//     import(`./${file}`).then((routerModule) => {
//       console.log("cargado", name);
//       router.use(`/${name}`, routerModule.router);
//     });
//   }
// }

// readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

// export default router;
