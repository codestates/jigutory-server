const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {
  userinfoController: async (req, res) => {
    if (!req.currentUserId) {
      return res.status(403).send({ message: "존재하지 않는 유저입니다." });
    } else {
      const userInfo = await user.findOne({
        where: { id: req.currentUserId },
      });
      return res.status(200).send(userInfo);
    }
  },

  profileImageController: async (req, res) => {
    const { image } = req.body;
    if (!image) {
      return res.status(400).send({ message: "사진을 업로드하세요." });
    }
    const createProfileImage = await user.update(
      {
        profileImage: image,
      },
      {
        where: { id: req.currentUserId },
      }
    );
    return res.status(200).send(createProfileImage);
  },

  usereditController: async (req, res) => {
    const { username, profileImage, statusMessage } = req.body;
    const userInfo = await user.update(
      {
        username,
        profileImage,
        statusMessage,
      },
      {
        where: { id: req.currentUserId },
      }
    );
    return res.status(200).send(userInfo);
  },
};
