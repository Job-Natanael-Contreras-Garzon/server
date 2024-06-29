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
exports.obtenerProductos = exports.callActualizarProducto = exports.callCrearProducto = exports.Producto = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
exports.Producto = conexion_1.default.define('Producto', {
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    tableName: 'producto', // Nombre de la tabla existente en la base de datos
    timestamps: false // Indica que no hay columnas 'createdAt' y 'updatedAt' en la tabla
});
//Llamada de los procedimientos almacenador
function callCrearProducto(marca, categoria, stock, precioCompra, precioVenta, fechaVencimineto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (fechaVencimineto == null) {
                const [results, metadata] = yield conexion_1.default.query(`CALL crear_producto_sin_fecha('${marca}', '${categoria}', '${stock}', '${precioCompra}', '${precioVenta}')`);
            }
            else {
                const [results, metadata] = yield conexion_1.default.query(`CALL crear_producto('${marca}', '${categoria}', '${stock}', '${precioCompra}', '${precioVenta}', '${fechaVencimineto}')`);
            }
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
            throw error;
        }
    });
}
exports.callCrearProducto = callCrearProducto;
function callActualizarProducto(cod, marca, categoria, stock, precioCompra, precioVenta, fechaVencimineto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (fechaVencimineto === undefined) {
                const [results, metadata] = yield conexion_1.default.query(`CALL modificar_producto_sinFecha('${cod}','${categoria}','${marca}', '${stock}', '${precioCompra}', '${precioVenta}')`);
            }
            else {
                const [results, metadata] = yield conexion_1.default.query(`CALL modificar_producto('${cod}','${categoria}','${marca}','${stock}', '${precioCompra}', '${precioVenta}', '${fechaVencimineto}')`);
            }
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
            throw error;
        }
    });
}
exports.callActualizarProducto = callActualizarProducto;
function obtenerProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results, metadata] = yield conexion_1.default.query(`SELECT * FROM obtener_productos()`);
            return results;
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
            throw error; // Puedes manejar el error como desees
        }
    });
}
exports.obtenerProductos = obtenerProductos;
//# sourceMappingURL=producto.js.map