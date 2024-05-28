import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routesProducto from './routes/producto';
import routerUser from './routes/user';
import routerfactura from './routes/factura';
import routerproveedor from './routes/proveedor';
import routeralmacen from './routes/almacen';
import { User } from './models/User';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// CORS configuration
app.use(cors({
    origin: 'https://proyectocruz.vercel.app'
}));

app.use('/api/producto', routesProducto);
app.use('/api/users', routerUser);
app.use('/api/factura', routerfactura);
app.use('/api/proveedor', routerproveedor);
app.use('/api/almacen', routeralmacen);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

(async () => {
    try {
        await User.sync();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();
