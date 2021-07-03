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
    // 장바구니 클릭하는 유저정보 및 상품 정보를 req.body로 전달
        const { username } = req.body
        const findOrderUser = await user.findOne({
            where: {
                username: username
            }
        })
        const findProduct = await product.findByPk(req.params.id)
        const addOrder = await order.create({
            userId: findOrderUser.dataValues.id,
            location: null,
            message: null,
            totalPrice: null
        })
        const addProductOrder = await db.sequelize.query(
            `Insert into product_order (productId, orderId) values(?,?)`, {
                replacements: [findProduct.dataValues.id, addOrder.dataValues.id],
                type: QueryTypes.INSERT
            }
        )
        

    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
    },

}    