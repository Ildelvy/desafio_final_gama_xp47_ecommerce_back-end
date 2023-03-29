import { validate, Joi } from "express-validation";

export default validate({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    fone: Joi.string().required(),
    tipo: Joi.string().required(),
  }),
});
