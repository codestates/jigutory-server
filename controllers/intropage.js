const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {

    intropageController: async (req, res) => {

        const totalClicks = await badge.sum('clickNum');
        const totalCarbon = await badge.sum('carbonReduction');
        const maxClick = await badge.max('clickNum');
        const maxCarbon = await badge.max('carbonReduction')
        // 전체 유저 중에서 최대 클릭한 수와 최대 탄소감소량도 넣었음
        // 혹시 좀 비어보이면 저 정보도 출력하면 괜찮을 듯
        // 안 쓸거면 삭제

        if(totalClicks && totalCarbon && maxClick && maxCarbon){
            res.status(200).send({totalClicks, totalCarbon, maxClick, maxCarbon})
        } else {
            res.status(500).send('error')
        }    
    }
    
}