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
    // infoController: async (req, res) => {
    //     // 상품을 클릭했을 때 상품의 자세한 정보를 보여주는 페이지
    //     // req.params로 보내주는게 나을까...그러면 api를 /product/info/:id 로..
    //     // 아니면 그냥 req.body로..
    //     // const selectedProduct = await product.findByPk(req.params.id)
    //     // res.status(200).send(selectedProduct)
    //     const getInfo = await product.findAll({
    //             attributes: ['id', 'name', 'image', 'description','price']
    //         })
    //         res.status(200).send(getInfo)
    // },

    listController: async (req, res) => {
        //상품 전체 목록을 보여줌
        // 상품을 클릭했을 때 상품의 자세한 정보를 보여주는 페이지
        // req.params로 보내주는게 나을까...그러면 api를 /product/info/:id 로..
        // 새로운 api 만드는 대신 req.body로 전송 => post

        const { productId, email } = req.body
        // product/list로 이동하기만 해도 모든 상품정보를 표시 -> 즉, 선택한 상품 없으면 (!productId) 모든 상품정보 표시
        if (!productId) {
            const getInfo = await product.findAll({
                attributes: ['id', 'name', 'image', 'description', 'price'],
            })
            res.status(200).send(getInfo)
        }

        // product/list 페이지에서 상품을 클릭시 post로 productId를 전송해주면
        // 모든 상품정보와 함께 선택한 상품의 정보도 전송 => 모든 상품정보는 그대로 보여주고 선택한 상품은 따로 클라에서 표시
        else if (productId && !email) {
            const getInfo = await product.findAll({
                attributes: ['id', 'name', 'image', 'description', 'price'],
            })
            const selectedProduct = await product.findOne({
                where: {
                    id: productId,
                },
            })
            res.status(200).send({ getInfo, selectedProduct })

            // 만약, 선택한 상품과 이메일을 클라에서 전송해주면 이메일로 유저를 찾고, productId로 상품을 찾은 후
            // order에 해당 유저로 주문을 추가하고 order, product 조인테이블에 연관 정보를 저장
        } else if (productId && email) {
            const findOrderUser = await user.findOne({
                where: { email: email },
            })
            //console.log(findOrderUser.dataValues.id)
            // const findOrder = await order.findOne({
            //     where: { userId: findOrderUser.dataValues.id }
            // })
            const findProduct = await order.findOne({
                where: { location: productId, userId: findOrderUser.id },
            })
            if (findProduct) {
                res.status(200).send({
                    message: '이미 장바구니에 있는 물건입니다.',
                })
            } else {
                const selectedProduct = await product.findOne({
                    where: {
                        id: productId,
                    },
                })

                const addOrder = await order.create({
                    userId: findOrderUser.dataValues.id,
                    location: selectedProduct.id,
                    message: 1,
                    totalPrice: selectedProduct.price,
                })
                await db.sequelize.query(
                    `Insert into order_product (orderId, productId) values(?,?)`,
                    {
                        replacements: [
                            addOrder.dataValues.id,
                            selectedProduct.dataValues.id,
                        ],
                        type: QueryTypes.INSERT,
                    },
                )
                res.status(200).send({ message: '장바구니에 추가되었습니다' })
            }
        }
    },
}
