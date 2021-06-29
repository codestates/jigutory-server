const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models"); 

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SERVER_ROOT_URI = 'http://localhost:4000'
const CLIENT_ROOT_URI = 'http://localhost:3000/user/signin'
const REDIRECT_URI = '/auth/googlesignin'

module.exports = {
  signinController: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "이메일이나 비밀번호를 확인하세요." });
    }

    const signInUser = await user.findOne({
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

  signupController: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "회원정보를 모두 입력하세요." });
    }

    const [signUpUser, created] = await user.findOrCreate({
      where: { email },
      defaults: { username, email, password },
    });

    if (!created) {
      return res.status(409).send({ message: "이미 존재하는 이메일입니다." });
    } else {
      return res.status(201).send(signUpUser);
    }
  },

  googlesigninController: async (req, res) => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
      redirect_uri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
      client_id: GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' ')
    }
    return res.send(`${rootUrl}?${querystring.stringify(options)}`)
  },
};
