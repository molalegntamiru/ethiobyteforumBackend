import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./config/config.env" });

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.json({ msg: "Authentication invalid" });
  const token = authHeader.split(" ")[1];
  console.log("authHeader : ", authHeader);
  try {
    const { username, userid } = await jwt.verify(token, process.env.SECERET);
    req.user = { username, userid };
  console.log("token : ", token);

    next();
  } catch (error) {
    // return res.json({ msg: "Something went wrong, try again later" });
    console.log(error)
  }
};
export default authMiddleware;
