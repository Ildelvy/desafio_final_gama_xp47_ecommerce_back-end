import {Request, Response} from 'express';

class MainController {

    public main(req: Request, res: Response){
        return res.json({
            mesage: `Api ecommerce! Seja bem vindo!`
        });
    }
}

export default new MainController();