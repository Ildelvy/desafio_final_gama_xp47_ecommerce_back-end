import { Request, Response } from 'express';
import UsuarioModel, { IUsuario } from '../../models/Usuario';
import bcrypt from 'bcryptjs';

class UsuarioController {

    public async create(req: Request, res: Response) {

        try {

            let { nome, email, senha, fone, tipo } = req.body;

            // testando se existe usuario cadastrado com o mesmo email
            const userExists = await UsuarioModel.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json(`Existe um usuário cadastrado com o email: ${email}`);
            }

            const newSenha = bcrypt.hashSync(senha, 10);
            senha = newSenha;

            const novoUsuario = await UsuarioModel.create({
                nome,
                email,
                senha,
                fone,
                tipo
            } as unknown as IUsuario);

            const user = { nome, email };

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
                user
            });

        } catch (error) {
            return res.status(400).json({ error: `Ocorreu um erro: ${error}` });
        }
    }

    public async createAdmin(req: Request, res: Response) {

        try {

            let { nome, email, senha, fone, tipo } = req.body;

            // testando se existe usuario cadastrado com o mesmo email
            const userExists = await UsuarioModel.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json(`Existe um usuário cadastrado com o email: ${email}`);
            }

            const newSenha = bcrypt.hashSync(senha, 10);
            senha = newSenha;

            const usuario = await UsuarioModel.create({
                nome,
                email,
                senha,
                fone,
                tipo
            });

            const user = { nome, email };

            return res.status(201).json({
                message: "Novo usuário administrador criado com sucesso!",
                user
            });

        } catch (error) {
            return res.status(400).json({ error: `Ocorreu um erro: ${error}` });
        }
    }

    public async update(req: Request, res: Response) {
        try {

            const { id } = req.params;

            if (!id) {
                return res.json("O parâmetro id é obrigatório.");
            }

            const payloadUpdate = {};

            Object.assign(payloadUpdate, req.body);

            const { senha } = req.body;

            if (senha) {
                const newSenha = bcrypt.hashSync(senha, 10);
                Object.assign(payloadUpdate, { senha: newSenha });
            }

            const usuario = await UsuarioModel.findByPk(id);

            if (!usuario) {
                return res.json(`Usuario de id '${id} não encontrado.'`);
            }

            const usuarioUpdate = await UsuarioModel.update(payloadUpdate, {
                where: { id },
            });

            return res.status(200).json(usuarioUpdate);

        } catch (error) {
            return res.status(500).json(`Ocorreu algum erro na atualização do usuário: ${error}`);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = await UsuarioModel.findByPk(id);
            if (!userId) {
                return res.status(400).json(`Usuario de id '${id}' não encontrado`);
            }
            const userRemove = await UsuarioModel.destroy({
                where:{
                    id
                }
            });
            return res.status(204).json('Usuário removido.');
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users = await UsuarioModel.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = await UsuarioModel.findByPk(id);
            if (!userId) {
                return res.status(400).json(`Usuario de id '${id}' não encontrado`);
            }
            return res.status(200).json(userId);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    public async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}

export default new UsuarioController();
