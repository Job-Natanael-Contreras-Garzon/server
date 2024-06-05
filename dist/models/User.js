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
exports.obtener_categoria_permiso = exports.callActualizarPassword = exports.callCrearUsuarioProcedure = exports.User = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = __importDefault(require("../db/conexion"));
// Definición del modelo User
exports.User = conexion_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario', // Nombre de la tabla existente en la base de datos
    timestamps: false // Indica que no hay columnas 'createdAt' y 'updatedAt' en la tabla
});
// Llamar al procedimiento almacenado para crear usuario
function callCrearUsuarioProcedure(nombreAdministrador, telefono, correoElectronico, username, password, tipoPermiso) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexion_1.default.query(`CALL crear_usuario(:nombreAdministrador, :telefono, :correoElectronico, :username, :password, :tipoPermiso)`, {
                replacements: {
                    nombreAdministrador,
                    telefono,
                    correoElectronico,
                    username,
                    password,
                    tipoPermiso
                }
            });
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
        }
    });
}
exports.callCrearUsuarioProcedure = callCrearUsuarioProcedure;
// Llamar al procedimiento almacenado para actualizar contraseña
function callActualizarPassword(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conexion_1.default.query(`CALL actualizar_contrasena(:username, :password)`, {
                replacements: {
                    username,
                    password
                }
            });
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
        }
    });
}
exports.callActualizarPassword = callActualizarPassword;
// Obtener categoría de permiso
function obtener_categoria_permiso(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results, metadata] = yield conexion_1.default.query(`SELECT obtener_categoria_permiso('${username}') AS categoria`);
            return results;
        }
        catch (error) {
            console.error('Error al llamar al procedimiento almacenado:', error);
            throw error; // Propaga el error para manejarlo en otro lugar si es necesario
        }
    });
}
exports.obtener_categoria_permiso = obtener_categoria_permiso;
//# sourceMappingURL=User.js.map