const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')
const db = require('../models/index')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {
    user,
    product,
    order,
    levelinfo,
    cafeinfo,
    badgeinfo,
    badge,
} = require('../models')
const e = require('express')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID


const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const SERVER_ROOT_URI = 'http://localhost:4000'
const CLIENT_ROOT_URI = 'http://localhost:3000/user/signin'
const REDIRECT_URI = '/auth/googlesignin'

module.exports = {
    loginController: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(400)
                .send({ message: '이메일이나 비밀번호를 확인하세요.' })
        }
        const loginUser = await user.findOne({
            where: { email, password },
        })
        if (!loginUser) {
            return res
                .status(404)
                .send({ message: '일치하는 유저가 없습니다.' })
        }
        const accessToken = jwt.sign(
            { id: loginUser.id, email: loginUser.email },
            process.env.ACCESS_SECRET,
            {
                expiresIn: '1h',
            },
        )
        const refreshToken = jwt.sign(
            { id: loginUser.id, email: loginUser.email },
            process.env.REFRESH_SECRET,
            {
                expiresIn: '30d',
            },
        )
        return res.status(200).send({
            data: { accessToken: accessToken, refreshToken: refreshToken },
            message: '로그인 되었습니다.',
        })
    },

    signupController: async (req, res) => {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res
                .status(400)
                .send({ message: '회원정보를 모두 입력하세요.' })
        }

        const [signUpUser, created] = await user.findOrCreate({
            where: { email },
            defaults: { username, email, password },
        })

        if (!created) {
            return res
                .status(409)
                .send({ message: '이미 존재하는 이메일입니다.' })
        } else {
            return res.status(201).send(signUpUser)
        }
    },

  googleloginController: async (req, res) => {
    //클라이언트에서 response.profileObject의 내용 중 해당하는 부분만 주면
    const { email, username, profileImage } = req.body;  // username은 email의 앞부분
    const googleToken = req.headers.authorization//const googleToken = req.headers.authorization
    // db에 저장되어 있는지 조회
    const googleInfo = await user.findOne({ 
        where: {
            email: email,
        }
    })
    if (googleInfo) {
        const accessTokenGoogle = jwt.sign(
            { id: googleInfo.id, email: googleInfo.email },
            process.env.ACCESS_SECRET,
            {
                expiresIn: '1h',
            },
        )
        const refreshTokenGoogle = jwt.sign(
            { id: googleInfo.id, email: googleInfo.email },
            process.env.REFRESH_SECRET,
            {
                expiresIn: '30d',
            },
        )

        res.status(200).send({
            accessTokenGoogle,
            refreshTokenGoogle,
            googleInfo,
        })
    } else if (!googleInfo) {
        await user.create({
            username: username,
            email: email,
            password: `${email}+${username}`,
            profileImage: profileImage
        })
        const findGoogleUser = await user.findOne({
            where: {
                email: email
            }
        })
        console.log(findGoogleUser.id)
        const accessTokenGoogle = jwt.sign(
            { id: findGoogleUser.id, email: findGoogleUser.email },
            process.env.ACCESS_SECRET,
            {
                expiresIn: '1h',
            },
        )
        const refreshTokenGoogle = jwt.sign(
            { id: findGoogleUser.id, email: findGoogleUser.email },
            process.env.REFRESH_SECRET,
            {
                expiresIn: '30d',
            },
        )
        return res.status(200).send({
            data: {
                findGoogleUser,
                accessToken: accessTokenGoogle,
                refreshToken: refreshTokenGoogle,
            },
            message: '구글로그인 되었습니다.',
        })
    } else {
        res.status(500).send('err')
    }
  },
  
   googlesignUpController: async (req, res) => {
      const { email, username } = req.body
      const googleUserInfo = await user.findOne({
          where: {
              email: req.body.email,
          },
      })
      //만약에 userinfo에 해당 이메일 주소가 없다면,
      if (!googleUserInfo) {
          const createUser = await user.create({
              email: email,
              username: username,
          })
          res.status(200).send(createUser)
      } else {
          res.status(500).send({ message: '이미 가입된 유저입니다.' })
      }
   },


    // kakaologinController: async (req, res) => {

    // },

    // kakaosignupController: async (req, res) => {

    // },
}
