import jwt from "jsonwebtoken";
import { config } from "../settings/config.js";

export const createJWT = async ({ userId }) => {
  return new Promise((res, rej) => {
    jwt.sign({ userId }, config.JWT_SECRET, (err, token) => {
      if (err) rej(err);
      res(token);
    });
  });
};

export const verifyJWT = async ({ token }) => {
  return new Promise((res, rej) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err || !decoded.userId) rej("Token invalido");
      res(decoded);
    });
  });
};
