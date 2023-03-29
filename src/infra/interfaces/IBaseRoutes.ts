import {Router} from 'express';

interface IBaseRoutes {
    buildRoutes(): void;
    getRoutes(): Router;
}

export default IBaseRoutes;