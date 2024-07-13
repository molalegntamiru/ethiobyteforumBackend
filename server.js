import app from "./app.js";
import db from "./config/dbconfig.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 5500;
const start = async () => {
  try {
    await db.execute("select 'test'");
    await app.listen(port);
    console.log(`database connected`);
    console.log(`server running at http://localhost:${port}`);
  } catch (error) {
    console.log(`Eyesera ayedelem`);
  }
};
start();
