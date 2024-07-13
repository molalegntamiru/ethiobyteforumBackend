import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
const db = mysql.createPool({
  connectionLimit: 10,
  database: "ethiobytedb",
  user: "ethiobyteadmin",
  host: "localhost",
  password: "12345678",
  // connectionLimit: process.env.LIMT,
  // database: process.env.DATABASE,
  // user: process.env.USER,
  // host: process.env.HOST,
  // password: process.env.PASSWORD,
});
export default db.promise();
