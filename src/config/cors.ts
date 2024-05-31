// src/config/cors.ts
import cors from 'cors';

const corsOptions = {
  origin: 'https://proyectocruz.vercel.app',
  optionsSuccessStatus: 200
};

export default cors(corsOptions);
