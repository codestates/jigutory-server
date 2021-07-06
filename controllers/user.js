const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')
const db = require('../models/index')
require('dotenv').config()
const {
    user,
    product,
    order,
    levelinfo,
    cafeinfo,
    badgeinfo,
    badge,
} = require('../models')

module.exports = {

  userinfoController: async (req, res) => {
      if (!req.currentUserId) {
          return res
              .status(403)
              .send({ message: '존재하지 않는 유저입니다.' })
      } else {
          const userInfo = await user.findOne({
              where: { id: req.currentUserId },
          })
          // const levelInfo = await levelinfo.findOne({
          //   where: {
          //     id: 1
          //   }
          // })
          return res.status(200).send(userInfo)
          //return res.status(200).send({ userInfo, levelInfo });
      }
      // userInfo 정보 전달할 때 레벨의 첫단계도 전달해야 하는가
      // 회원가입하자마자 레벨은 1단계 적용할 필요 (아무것도 없을 수는 없으니까)
  },

  profileImageController: async (req, res) => {
      const { image } = req.body
      if (!image) {
          return res.status(400).send({ message: '사진을 업로드하세요.' })
      }
      const createProfileImage = await user.update(
          {
              profileImage: image,
          },
          {
              where: { id: req.currentUserId },
          },
      )
      return res.status(200).send(createProfileImage)
  },

  usereditController: async (req, res) => {
      const { username, profileImage, statusMessage } = req.body
      const userInfo = await user.update(
          {
              userId: req.currentUserId,
              username,
              profileImage,
          },
          {
              where: { id: req.currentUserId },
          },
      )
      return res.status(200).send(userInfo)
  },

  passwordController: async (req, res) => {
      const { rvsdpassword } = req.body
      const editPassword = await user.update(
          {
              password: rvsdpassword,
          },
          {
              where: { id: req.currentUserId },
          },
      )
      return res.status(200).send(editPassword)
  },

  withdrawController: async (req, res) => {
      if (!req.currentUserId) {
          return res
              .status(403)
              .send({ message: '존재하지 않는 유저라 탈퇴 할 수 없습니다.' })
      } else {
          const withdrawUser = await user.destroy({
              where: { id: req.currentUserId },
          })
          return res.status(200).send({ message: '탈퇴가 완료 되었습니다.' })
      }
  },

}
