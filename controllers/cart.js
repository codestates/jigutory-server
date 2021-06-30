const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    readController: async (req, res) => {
    // 나의 장바구니 목록을 보는 코드 
        const { username } = req.body
        const findOrderUser = await user.findOne({
            where: {
                username: username
            }
        })
        const showCart = await order.findAll({
            attributes: ['id', 'userId', 'location', 'message', 'totalPrice'],
            include: {
                model: product,
                attributes: ['id', 'name', 'image', 'description', 'price']
            },
            where: {
                userId: findOrderUser.dataValues.id
            },
            through: 'order_product'
        })
        res.status(200).send(showCart)
    },    

    updateController: async (req, res) => {
    // 상품을 선택하고 거기서 장바구니 담기 버튼을 클릭 시 장바구니에 담는 코드
    // 장바구니 클릭하는 유저정보는 req.body, 상품 정보를 req.params로 전달
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
        await db.sequelize.query(
            `Insert into order_product (orderId, productId) values(?,?)`, {
                replacements: [addOrder.dataValues.id, findProduct.dataValues.id],
                type: QueryTypes.INSERT
            }
        )
        res.status(200).send('success')
    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
    },

}    