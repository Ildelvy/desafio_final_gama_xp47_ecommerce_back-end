import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsuarioModel, { IUsuario }  from '../../models/Usuario';
import bcrypt from 'bcryptjs';

class AuthController {
    
    async login(req: Request, res: Response) {        

        const { email, senha } = req.body;

        const user = await UsuarioModel.findOne({ where: { email } }) as unknown as IUsuario;

        if (!user) {
            return res.status(400).json(`E-mail ou senha inválidos.`);
        }

        const verifyPassword = await bcrypt.compare(senha, user.senha);

        if(!verifyPassword){
            return res.status(400).json('E-mail ou senha inválidos.');
        }

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY as string,{
            expiresIn: '1d'
        });
        
        const { nome } = user;

        return res.json({ 
            user: nome,
            token: token
        }); 
    }
}

export default new AuthController();