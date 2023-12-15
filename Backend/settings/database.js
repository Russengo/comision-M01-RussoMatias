import { connect } from "mongoose";
import { config } from "./config.js";

export const startConnection = async () => {
  try {
    const db = await connect(config.MONGO_URI);
    console.log("db is connected to", db.connection.name);
  } catch (error) {
    console.log(error);
  }
};
