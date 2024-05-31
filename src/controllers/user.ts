import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, callActualizarPassword, obtener_categoria_permiso, callCrearUsuarioProcedure } from '../models/User';
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    const { nombreAdministrador, telefono, correoElectronico, username, password, tipoPermiso } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: 'El nombre de usuario y la contraseña son obligatorios.'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }

    try {
        await callCrearUsuarioProcedure(nombreAdministrador, telefono, correoElectronico, username, hashedPassword, tipoPermiso);
        res.json({
            msg: `Usuario ${username} creado exitosamente`,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups, ocurrió un error',
            error
        });
    }
};

export const newPassword = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: 'El nombre de usuario y la nueva contraseña son obligatorios.'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base de datos`
        });
    }

    try {
        await callActualizarPassword(username, hashedPassword);
        res.json({
            msg: `Password actualizado exitosamente`,
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ups, ocurrió un error',
            error
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: 'El nombre de usuario y la contraseña son obligatorios.'
        });
    }

    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base de datos`
        });
    }

    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) {
        return res.status(400).json({
            msg: 'Password Incorrecta'
        });
    }

    const token = jwt.sign({ username: username }, process.env.SECRET_KEY || 'SuperPutz');
    res.json(token);
};

export const UserPer = async (req: Request, res: Response) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({
            msg: 'El nombre de usuario es obligatorio.'
        });
    }

    const user: any = await User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base de datos`
        });
    }

    try {
        const permiso = await obtener_categoria_permiso(username);
        res.json(permiso);
    } catch (error) {
        res.status(400).json({
            msg: 'Ups, ocurrió un error',
            error
        });
        console.log(error);
        console.error(error);
    }
};
