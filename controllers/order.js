const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    orderListController: async (req, res) => {
        if (!req.currentUserId) {
            return res.status(403).send({ message: "회원가입 후 주문내역을 확인 할 수 있습니다." });
          } else {
            const orderInfo = await user.findAll({
              where: { userId: req.currentUserId },
            });

            return res.status(200).send(orderInfo);

          }
        },
    orderController: async (req,res)=>{
        
    }
}    