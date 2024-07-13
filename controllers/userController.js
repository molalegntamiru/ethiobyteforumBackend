import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../config/dbconfig.js";
dotenv.config({ path: "./config/config.env" });
const displayUser = (req, res) => {
  const { username, userid } = req.user;
  return res.json({ username, userid });
  res.send("Welcome to user authentication");
};
const registeruser = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password)
    return res.json({ msg: "please fill required fields" });
  if (password.length < 8)
    return res.json({ msg: "password must be greater than 8 character" });
  try {
    const [user] = await db.query(
      "select username , userid, email from users where username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0)
      return res.json({ msg: "user already exists", user: user });
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    await db.query(
      "insert into users(username, firstname, lastname, email, password) values(?,?,?,?,?)",
      [username, firstname, lastname, email, hashPass]
    );
    return res.json({ msg: "user registred successfully`````````" });
  } catch (error) {
    return res.json({ msg: "something went wrong, try again later" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ msg: "please eneter required fields" });
  try {
    const [user] = await db.query(
      "select username, userid, password from users where email = ?",
      [email]
    );
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (user.length == 0) return res.json({ msg: "Authentication Invalid" });
    if (!isMatch) return res.json({ msg: "Authentication Invalid p" });
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.SECERET, {
      expiresIn: "1h",
    });
    return res.json({ user: user, token: token });
  } catch (error) {
    return res.json({ msg: "something went wrong , try again later" });
  }
};
export { displayUser, login, registeruser };
