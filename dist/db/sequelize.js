"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const conexion_1 = require("./conexion");
exports.sequelize = new sequelize_1.Sequelize(conexion_1.sequelizeConfig.url, {
    dialect: conexion_1.sequelizeConfig.dialect,
    dialectOptions: conexion_1.sequelizeConfig.dialectOptions,
});
