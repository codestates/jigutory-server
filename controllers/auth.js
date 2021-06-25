const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "이메일이나 비밀번호를 확인하세요." });
    }

    const signInUser = await User.findOne({
      where: { email, password },
    });
    if (!signInUser) {
      return res.status(404).send({ message: "일치하는 유저가 없습니다." });
    }

    const accessToken = jwt.sign(
      { id: signInUser.id, email: signInUser.email },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: signInUser.id, email: signInUser.email },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).send({
      data: { accessToken: accessToken, refreshToken: refreshToken },
      message: "로그인 되었습니다.",
    });
  },

  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "회원정보를 모두 입력하세요." });
    }

    const [signUpUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, email, password },
    });

    if (!created) {
      return res.status(409).send({ message: "이미 존재하는 이메일입니다." });
    } else {
      return res.status(201).send(signUpUser);
    }
  },
};
