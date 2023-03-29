import { Router } from 'express';
import IBaseRoutes from '../../infra/interfaces/IBaseRoutes';
import AuthController from './auth.controller';
import loginValidation from './validations';

class AuthRoutes implements IBaseRoutes {

    public routes: Router;

    public constructor(){ 
        this.routes = Router();
        this.buildRoutes();
    }

    buildRoutes(){
        this.routes.post('/login', loginValidation.login ,AuthController.login);
    }
    getRoutes(){
        return this.routes;
    }    
}

export default new AuthRoutes();