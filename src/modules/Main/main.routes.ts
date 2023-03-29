import {Router} from 'express';
import IBaseRoutes from '../../infra/interfaces/IBaseRoutes';
import MainController from './main.controller';

class MainRoutes implements IBaseRoutes{

    public routes: Router;

    public constructor(){
        this.routes = Router();
        this.buildRoutes();
    }

    buildRoutes(){
        this.routes.get('/', MainController.main);
    }
    getRoutes(){
        return this.routes;
    }
}

export default new MainRoutes();