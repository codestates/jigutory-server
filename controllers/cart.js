const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    readController: async (req, res) => {
    //장바구니 이동 버튼 클릭 시 나의 장바구니 목록을 보는 코드 
        const { email } = req.body
        const findOrderUser = await user.findOne({
            where: {
                email: email
            }
        })
        const showCart = await product.findAll({
            attributes: ['id', 'name', 'image', 'description', 'price'],
            include: {
                model: orders,
                attributes: ['id', 'userId', 'location', 'message', 'totalPrice'],
                where: {
                    userId: findOrderUser.dataValues.id
                }
            },
            through: 'order_product'
        })
        res.status(200).send(showCart)

        // const showCart = await order.findAll({
        //     attributes: ['id', 'userId', 'location', 'message', 'totalPrice'],
        //     include: {
        //         model: product,
        //         attributes: ['id', 'name', 'image', 'description', 'price']
        //     },
        //     where: {
        //         userId: findOrderUser.dataValues.id
        //     },
        //     through: 'order_product'
        // })
    },    

    updateController: async (req, res) => {
    // 상품을 선택하고 거기서 장바구니 담기 버튼을 클릭 시 장바구니에 담는 코드
    // 장바구니 클릭하는 유저정보는 req.body, 상품 정보를 req.params로 전달
    // 클라에서 수량, 총금액 하면 여기는 딱히 필요가 없게 됨
        const { email, productId } = req.body

        const findOrderUser = await user.findOne({
            where: {
                email: email
            }
        })
        const findOrder = await order.findOne({
            where: {
                userId: findOrderUser.dataValues.id
            }
        })
        const findProduct = await product.findOne({
            where: {
                id: productId
            }
        })
        if(!findOrder){
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
        } else if(findOrder){
            await order.update({
                where: {
                    userId: findOrderUser.dataValues.id
                }
            })
            res.status(200).send('success')
        } else {
            res.status(500).send('error')
        }
        
    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
        const { username } = req.body
        const findDeleteUser = await user.findOne({
            where: {
                username: username
            }
        })
        await order.destroy({
            where: {
                userId: findDeleteUser.dataValues.id
            }
        })
        await db.sequelize.query(
            `Delete from order_product where orderId = ?`, {
                //replacements: [// 이 부분에 orderId를 지칭하는 변수 필요],
                type: QueryTypes.DELETE
            }
        )
    },

}    