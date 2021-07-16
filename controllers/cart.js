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
                email: email,
            },
        })
        const showCart = await product.findAll({
            attributes: ['id', 'name', 'image', 'description', 'price'],
            include: {
                model: order,
                attributes: [
                    'id',
                    'userId',
                    'location',
                    'message',
                    'totalPrice',
                ],
                where: {
                    userId: findOrderUser.dataValues.id,
                },
            },
            through: 'order_product',
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
    const { email, quantitiy , id, price } = req.body;
    
    const findUpdateUser = await user.findOne({
        where: {
            email: email
        }
    })
        
    const updateQuantitiy = await order.update(
        {
            message:quantitiy,
            totalPrice:price,
        },
            {
            where : 
            { 
                location:id,
                userId:findUpdateUser.id
            }
        }
    )

    return res.status(200).send(updateQuantitiy)
    },

    deleteController: async (req, res) => {
    // 장바구니에서 상품을 지우는 코드
        const { email , productid } = req.body;
        console.log(email)
        const findDeleteUser = await user.findOne({
            where: {
                email: email,
            },
        })
        const destroyOrder = await order.destroy({
            where: {
                location:productid,
                userId:findDeleteUser.id
            }
        })
        res.status(200).send({message:'장바구니에서 삭제 되었습니다'})
    
    },

    countController : async (req,res)=> {
        const { email }  = req.body;

        const findCountUser = await user.findOne({
            where: {
                email: email
            }

        })

        const findCount = await order.findAndCountAll({
            where:{
                userId : findCountUser.id
            }
        })
        res.status(200).send({findCount})
    }

}

