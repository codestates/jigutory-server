const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


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
        // const selectedProduct = await product.findOne({
        //     where: { id: req.body.id }
        // })
        // return res.status(200).send(selectedProduct)

        //const { productId } = req.body // 클릭한 상품의 id를 전송

        const { productId, addCart } = req.body
        // 클라에서 장바구니 추가 버튼 클릭하면 addCart 정보를 전송해서
        // if로 분기
        
        if(!productId){
            const getInfo = await product.findAll({
                attributes: ['id', 'name', 'image', 'description','price']
            })
            res.status(200).send(getInfo)
         }    
        
        // product 페이지에서 상품을 클릭시 post로 productId를 전송
        else if(productId){
            const getInfo = await product.findAll({
                attributes: ['id', 'name', 'image', 'description','price']
            })
            const selectedProduct = await product.findOne({
                where: {
                    id: productId
                }
            })
            res.status(200).send({getInfo,selectedProduct})
        } else {
            res.status(400).send('선택한 상품이 없습니다')
        }    

    },

}    