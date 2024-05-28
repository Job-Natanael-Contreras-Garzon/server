// src/config/cors.ts
import cors from 'cors';

const allowedOrigins = ['https://proyectocruz.vercel.app'];

const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};

export default cors(corsOptions);
