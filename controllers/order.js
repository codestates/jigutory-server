const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    orderController: async (req, res) => {
    // 주문하기 버튼을 클릭했을 때 코드인데...우리는 주문하기 버튼 클릭하면 아직
    // 결제단계는 준비중이라는 문구를 클라에서 띄울거니까 여기는 작성할게 없음
    },    

}    