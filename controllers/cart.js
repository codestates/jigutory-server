const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    readController: async (req, res) => {
    // 나의 장바구니 목록을 보는 코드 -> product_order 테이블 사용

    },    

    updateController: async (req, res) => {
    // 상품을 선택하고 거기서 장바구니 담기 버튼을 클릭 시 장바구니에 담는 코드
    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
    },

}    