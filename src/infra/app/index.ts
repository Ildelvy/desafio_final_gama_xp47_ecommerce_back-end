import express, { Router, Express } from 'express';

import cors from 'cors';
import handleError from '../middlewares/handleError';

class App {

    public server: Express;
    public port: number;

    public constructor(routes: Router[], port: number) {
        console.log(`Iniciando o servidor!`);
        this.server = express();
        this.server.use(express.json());
        

        this.server.use(cors());
        console.log('Registrando rotas...');
        routes.forEach(route => this.server.use(route));
        console.log('Rotas registradas...');
        this.server.use(handleError);
        this.port = port;
    }

    public run() {
        this.server.listen(this.port, () => console.log(`Servidor rodando na porta: ${this.port}`));
    }
}

export default App;