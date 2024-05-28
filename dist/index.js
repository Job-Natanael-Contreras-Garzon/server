"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const producto_1 = __importDefault(require("./routes/producto"));
const user_1 = __importDefault(require("./routes/user"));
const factura_1 = __importDefault(require("./routes/factura"));
const proveedor_1 = __importDefault(require("./routes/proveedor"));
const almacen_1 = __importDefault(require("./routes/almacen"));
const User_1 = require("./models/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'https://proyectocruz.vercel.app'
}));
app.use('/api/producto', producto_1.default);
app.use('/api/users', user_1.default);
app.use('/api/factura', factura_1.default);
app.use('/api/proveedor', proveedor_1.default);
app.use('/api/almacen', almacen_1.default);
app.get('/', (req, res) => {
    res.send('API is running');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.sync();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
}))();
