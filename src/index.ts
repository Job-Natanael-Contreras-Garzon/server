// src/index.ts
import express, { Application } from 'express';
import corsConfig from './config/cors';
import routesProducto from './routes/producto';
import routerUser from './routes/user';
import routerfactura from './routes/factura';
import routerproveedor from './routes/proveedor';
import routeralmacen from './routes/almacen';
import { User } from './models/User';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use('/api/producto', routesProducto);
        this.app.use('/api/users', routerUser);
        this.app.use('/api/factura', routerfactura);
        this.app.use('/api/proveedor', routerproveedor);
        this.app.use('/api/almacen', routeralmacen);
    }

    middlewares() {
        this.app.use(express.json());
        // cors
        this.app.use(corsConfig);
    }

    async dbConnect() {
        try {
            await User.sync();
            console.log('Base conectada con éxito');
        } catch (error) {
            console.log('Error en la base de datos: ', error);
        }
    }
}

export default Server;
