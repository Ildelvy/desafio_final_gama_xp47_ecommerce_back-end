import UsuarioModel from "../models/Usuario";

declare global {
    namespace Express {
        export interface Request {
            user: UsuarioModel
        }
    }
}