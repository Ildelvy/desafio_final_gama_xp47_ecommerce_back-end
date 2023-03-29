import App from "./infra/app";

import MainRoutes from "./modules/Main/main.routes";
import UsuarioRoutes from "./modules/Usuario/usuario.routes";
import AuthRoutes from "./modules/Auth/auth.routes";

const app = new App([AuthRoutes.getRoutes(), MainRoutes.getRoutes(), UsuarioRoutes.getRoutes()], 3000);

app.run();