import { Router } from 'express';
import IBaseRoutes from '../../infra/interfaces/IBaseRoutes';
import { authMiddleware } from '../../infra/middlewares/authMiddleware';
import UsuarioController from './usuario.controller'
import usuarioValidation from './validations';

class UsuarioRoutes implements IBaseRoutes {

    public routes: Router;

    public constructor() {
        this.routes = Router();
        this.buildRoutes();
    }

    buildRoutes() {
        this.routes.post('/usuario/admin', authMiddleware, usuarioValidation.createAdmin, UsuarioController.createAdmin);
        this.routes.post('/usuario', usuarioValidation.create , UsuarioController.create);
        this.routes.get('/usuario', authMiddleware, UsuarioController.getAll);
        this.routes.get('/usuario/:id', authMiddleware, usuarioValidation.getOne, UsuarioController.getById);
        this.routes.put('/usuario/:id', authMiddleware, usuarioValidation.update, UsuarioController.update);
        this.routes.delete('/usuario/:id', authMiddleware, usuarioValidation.destroy, UsuarioController.delete);
        this.routes.get('/usuario/perfil/:id', authMiddleware, UsuarioController.getProfile);
    }
    getRoutes() {
        return this.routes;
    }
}
export default new UsuarioRoutes();