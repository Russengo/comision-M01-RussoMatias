import { UserModel } from "../models/user.model.js";
import { createJWT } from "../utils/jwt.js";
import * as bcrypt from "bcrypt";

export const ctrlCreateUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
};

export const ctrlListUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlFindOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const ctrlLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Credenciales no válidas" });

    const token = await createJWT({ userId: user._id });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
