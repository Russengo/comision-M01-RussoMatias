import { body } from "express-validator";
import { applyValidations } from "../../middlewares/applyvalidator.js";
import { UserModel } from "../user.model.js";

export const createUserValidations = [
  body("username")
    .notEmpty()
    .withMessage("El campo no debe estar vacio")
    .isString()
    .withMessage("El campo debe ser un string")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) throw new Error("Nombre de usuario ya utilizado");
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("El campo no debe estar vacio")
    .isEmail()
    .withMessage("La direccion debe ser valida")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) throw new Error("Email en uso");
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("El campo no debe estar vacio")
    .isString()
    .withMessage("El campo debe ser un string")
    .trim()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),

  applyValidations,
];

export const loginUserValidations = [
  body("email")
    .notEmpty()
    .withMessage("El campo no debe estar vacio")
    .isEmail()
    .withMessage("La direccion debe ser valida"),
  body("password")
    .notEmpty()
    .withMessage("El campo no debe estar vacio")
    .isString()
    .withMessage("El campo debe ser un string"),

  applyValidations,
];
