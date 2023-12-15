import { header, param, body } from "express-validator";
import { applyValidations } from "../../middlewares/applyvalidator.js";

export const createPostValidation = [
  body("title")
    .notEmpty()
    .withMessage("El campo no debe estar vacio.")
    .isString()
    .withMessage("El campo debe ser un string."),
  body("description")
    .notEmpty()
    .withMessage("El campo no debe estar vacio.")
    .isString()
    .withMessage("El campo debe ser un string."),

  applyValidations,
];

export const listPostValidation = [
  header("authorization").exists(),

  applyValidations,
];
