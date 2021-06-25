const { User } = require("../models");

module.exports = {
  userInfo: async (req, res) => {
    if (!req.currentUserId) {
      return res.status(403).send({ message: "존재하지 않는 유저입니다." });
    } else {
      const userInfo = await User.findOne({
        where: { id: req.currentUserId },
      });
      return res.status(200).send(userInfo);
    }
  },

  profileImage: async (req, res) => {
    const { image } = req.body;
    if (!image) {
      return res.status(400).send({ message: "사진을 업로드하세요." });
    }
    const createProfileImage = await User.update(
      {
        profileImage: image,
      },
      {
        where: { id: req.currentUserId },
      }
    );
    return res.status(200).send(createProfileImage);
  },

  statusMessage: async (req, res) => {
    const { content } = req.body;
    if (!content) {
      return res.status(400).send({ message: "내용을 입력하세요." });
    }
    const createStatusMessage = await User.update(
      {
        statusMessage: content,
      },
      {
        where: { id: req.currentUserId },
      }
    );
    return res.status(200).send(createStatusMessage);
  },

  userEdit: async (req, res) => {
    const { username, profileImage, statusMessage } = req.body;
    const userInfo = await User.update(
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
