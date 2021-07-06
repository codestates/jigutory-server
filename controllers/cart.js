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
                model: order,
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
    // 클라에서 수량, 총금액 하면 여기는 딱히 필요가 없게 됨
        
    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
        const { email } = req.body
        const findDeleteUser = await user.findOne({
            where: {
                email: email
            }
        })
        const findOrder = await order.findOne({
            where: {
                userId: findDeleteUser.dataValues.id
            }
        })
        await db.sequelize.query(
            `Delete from order_product where orderId = ?`, {
                replacements: [findOrder.dataValues.id],
                type: QueryTypes.DELETE
            }
        )
        await order.destroy({
            where: {
                userId: findDeleteUser.dataValues.id
            }
        })
        res.status(200).send('장바구니에서 삭제되었습니다')

    },
}
