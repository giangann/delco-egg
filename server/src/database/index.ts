import mysql from "mysql2";
import config from "../config/db.config";

export default mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});
