import Joi from "joi";

const userSchemaValiodation = Joi.object({
    //optional - id opcional
    id: Joi.number().optional(),
    name: Joi.string().min(3).max(100).required().messages({
        "string.integer": "O Campo nome deve ser uma string",
        "string.empty": "O Campo nome não pode ser vazio",
        "string.min": "O Campo nome deve ter no mínimo 3 caracteres",
        "string.max": "O Campo nome deve ter no máximo 100 caracteres",
        "any.required": "O Campo nome é obrigatório",
    }),
    email: Joi.string().email().min(10).max(100).required().messages({
        "string.email": "O Campo email deve ser um email válido",
        "string.empty": "O Campo email não pode ser vazio",
        "string.min": "O Campo email deve ter no mínimo 10 caracteres",
        "string.max": "O Campo email deve ter no máximo 100 caracteres",
        "any.required": "O Campo email é obrigatório",
    }),
    password: Joi.string().min(8).max(100).required().messages({
        "string.empty": "O Campo senha não pode ser vazio",
        "string.min": "O Campo senha deve ter no mínimo 8 caracteres",
        "string.max": "O Campo senha deve ter no máximo 100 caracteres",
        "any.required": "O Campo senha é obrigatório",
    }),
    birth_date: Joi.date().required().messages({
        "date.base": "O Campo data de nascimento deve ser uma data",
        "date.format": "O Campo data de nascimento deve ser uma data",
        "any.required": "O Campo data de nascimento é obrigatório",
    }),
    active: Joi.boolean().optional().messages({
        "any.only": "O Campo ativo deve ser um booleano",
    }),
});

export default userSchemaValiodation;
