import { dbConfig } from "../server";
import mysql from "mysql2/promise";

async function create({ resumeUrl, bio, userId }) {
  const connection = await mysql.createConnection(dbConfig);
  const sql = "INSERT INTO metrics (resumeUrl, bio, userId) VALUES (?,?,?)";
  await connection.query(sql, [resumeUrl, bio, userId]);
  await connection.end();
}
