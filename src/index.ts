import dotenv from 'dotenv';
dotenv.config();

import  express, {Application}  from "express";
import cors from 'cors'
import routesProducto from './routes/producto';
import routerUser from './routes/user';
import routerfactura from './routes/factura';
import routerproveedor from './routes/proveedor';
import routeralmacen from './routes/almacen';
import routerbitacora from './routes/bitacora';
import routerinventario from './routes/inventario';
import routernotasalida from './routes/nota_salida';
import routerpermisos from './routes/permisos';
import routerboletacompra from './routes/boleta_compra';
import { User } from "./models/User";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    private routes() {
        this.app.use('/api/producto', routesProducto);
        this.app.use('/api/users',routerUser);
        this.app.use('/api/factura',routerfactura);
        this.app.use('/api/proveedor',routerproveedor);
        this.app.use('/api/almacen',routeralmacen);
        this.app.use('/api/bitacora',routerbitacora);
        this.app.use('/api/inventario',routerinventario);
        this.app.use('/api/notasalida',routernotasalida);
        this.app.use('/api/permisos',routerpermisos);
        this.app.use('/api/boletacompra',routerboletacompra);
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());//{ origin: 'https://proyectocruz.vercel.app' }
    }

    private async dbConnect() {
        try {
            await User.sync();
            console.log('Base de datos conectada con éxito');
        } catch (error) {
            console.error('Error en la base de datos: ', error);
        }
    }
}

const server = new Server();
export default server;
