const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");

module.exports = {

    readController: async (req, res) => {
        //클릭 한번으로 level 정보와 badge 정보를 다 줄 수 없음 (api가 다르다)
        //뱃지를 획득할 수 있는 조건을 클라에서 정의해서 그 조건에 맞았을 때 뱃지획득 버튼 활성화
        //  -> 클라의 조건과 아래 조건을 같게 함  
        //그래서 그 버튼을 클릭 시 아래 코드 실행
        const { carbonReduction, username } = req.body;

        const getCarbonInfo = await user.findOne({
            where: {
              username: username
            }
        })
        if(carbonReduction > 500 && carbonReduction < 900){
            const badgeOne = await badgeinfo.findOne({
                where: { id: 1 }
            })
            res.status(200).send({getCarbonInfo, badgeOne})
        } else if(carbonReduction > 900 && carbonReduction < 2000){
            const badgeTwo = await badgeinfo.findOne({
                where: { id: 2 }
            })
            res.status(200).send({getCarbonInfo, badgeOne, badgeTwo})
        } else if(carbonReduction > 2000 && carbonReduction < 3500){
            const badgeThree = await badgeinfo.findOne({
                where: { id: 3 }
            })
            res.status(200).send({getCarbonInfo, badgeOne, badgeTwo, badgeThree})
        } else if(carbonReduction > 3500 && carbonReduction < 5000){
            const badgeFour = await badgeinfo.findOne({
                where: { id: 4 }
            })
            res.status(200).send({getCarbonInfo, badgeOne, badgeTwo, badgeThree, badgeFour})
        } else if(carbonReduction > 5000){
            const badgeFive = await badgeinfo.findOne({
                where: { id: 5 }
            })
            res.status(200).send({getCarbonInfo, badgeOne, badgeTwo, badgeThree, badgeFour, badgeFive})
        }

                 
    },    

}    