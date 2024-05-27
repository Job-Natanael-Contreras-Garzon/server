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
const producto_1 = __importDefault(require("../routes/producto"));
const user_1 = __importDefault(require("../routes/user"));
const factura_1 = __importDefault(require("../routes/factura"));
const proveedor_1 = __importDefault(require("../routes/proveedor"));
const almacen_1 = __importDefault(require("../routes/almacen"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/factura', factura_1.default);
        this.app.use('/api/proveedor', proveedor_1.default);
        this.app.use('/api/almacen', almacen_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        // cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log('Base conectada con éxito');
            }
            catch (error) {
                console.log('Error en la base de datos: ', error);
            }
        });
    }
}
exports.default = Server;
