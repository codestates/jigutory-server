const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    infoController: async (req, res) => {
        // 상품을 클릭했을 때 상품의 자세한 정보를 보여주는 페이지
        // req.params로 보내주는게 나을까...그러면 api를 /product/info/:id 로..

        const selectedProduct = await product.findOne({
            where: { id: req.body.id }
        })
        return res.status(200).send(selectedProduct)

    },    

    listController: async (req, res) => {
        //상품 전체 목록을 보여줌

        const getInfo = await product.findAll({

            attributes: ['id', 'name', 'image', 'description','price']
        })
        res.status(200).send(getInfo)
    },

}    