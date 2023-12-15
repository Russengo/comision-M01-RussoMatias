import { header, param, body } from "express-validator";
import { applyValidations } from "../../middlewares/applyvalidator.js";
import { isValidObjectId } from "mongoose";

export const createCommentValidation = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio")
    .isString()
    .withMessage("El parametro debe ser un string")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser un ID valido"),
  body("description").isString().withMessage("El campo debe ser un string"),

  applyValidations,
];

export const listCommentValidation = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio")
    .isString()
    .withMessage("El parametro debe ser un string")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser un ID valido"),

  applyValidations,
];

export const getCommentValidation = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser un ID valido"),
  param("commentId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser un ID valido"),

  applyValidations,
];

export const deleteCommentValidation = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser una id valida."),
  param("commentId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser una id valida."),

  applyValidations,
];

export const updateCommentValidation = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { playListId } debe ser una id valida."),
  param("commentId")
    .notEmpty()
    .withMessage("El parametro no debe estar vacio.")
    .isString()
    .withMessage("El parametro debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro debe ser una id valida."),

  applyValidations,
];
