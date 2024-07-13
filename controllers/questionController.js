import dbconn from "../config/dbconfig.js";
const displayQuestion = async (req, res) => {
  try {
    const [question] = await dbconn.query(
      "select * from users u inner join questions q on u.userid = q.userid"
    );
    return res.json({ question });
  } catch (error) {
    return res.json({ error });
  }
};
const registerQuestion = async (req, res) => {
  const { username, userid } = req.user;
  const { questionid, title, description } = req.body;
  if (!questionid || !title || !description)
    return res.json({ msg: "please fill required fields" });
  try {
    await dbconn.query(
      "insert into questions(userid,questionid, title, description) values(?,?,?,?)",
      [userid, questionid, title, description]
    );
    return res.json({ msg: "registred" });
  } catch (error) {
    return res.json({ error });
  }
};
export { displayQuestion, registerQuestion };
