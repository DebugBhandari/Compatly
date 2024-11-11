import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import { dbConfig } from "./server.js";

export const createUser = async (fullname, email, password, isCompany) => {
  const connection = await mysql.createConnection(dbConfig);
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users (fullname, email, password, isCompany) VALUES (?, ?, ?, ?)";
  await connection.query(sql, [fullname, email, hashedPassword, isCompany]);
  await connection.end();
};

export const findByEmail = async (email) => {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "SELECT * FROM users WHERE email = ?";
  const [results] = await connection.query(sql, [email]);
  await connection.end();
  return results;
};

export const findOrCreate = async (fullname, email, password, isCompany) => {
  let user = await findByEmail(email);
  if (user.length === 0) {
    await createUser(fullname, email, password, isCompany);
    user = await findByEmail(email);
  }
  return user[0];
};
