const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models");


module.exports = {
    // 레벨에서 클릭 수와 탄소저감 수치 두개 다 db에 업데이트하고 클라로 전송
    // 뱃지에서는 단지 그 수치를 버튼을 클릭하든 뭘 해서 전달해주기만 하면 됨
    readController: async (req, res) => {
        const { clickNum, email } = req.body;
        const carbon = (num) =>  num * 25

        // users와 badges가 일대일로 연결된 스키마 가정 (badges에는 userId 외래키 있음)
        if(clickNum === 0){
            // 유저가 로그인해서 맨 처음에 클릭했을 때 작동 -> badges 테이블에 유저의 데이터 생성
            // req.body로 보내준 username으로 로그인한 유저의 정보를 가져옴
            const findUser = await user.findOne({
                where: {
                    email: email
                }
            })
            //console.log(findUser.dataValues.id)
            const submitBadge = await badge.create({
                clickNum: clickNum + 1,
                carbonReduction: carbon(clickNum + 1),
                badgeinfo: null,
                userId: findUser.dataValues.id // 클릭한 유저의 id를 badesg userId 외래키로 넣어서 관계 연결
            })
            //console.log(submitBadge.dataValues.id)
  
            // const submitUserBadge = await db.sequelize.query(
            //     `Insert into user_badge (userId, badgeId) values(?,?)`, {
            //       replacements: [submitBadge.dataValues.id, findUser.dataValues.id],
            //       type: QueryTypes.INSERT
            //     }
            // )
            if(submitBadge && findUser){
                // 유저 id에 해당하는 유저 정보와 뱃지 정보를 가져옴
                const getInfo = await badge.findOne({
                    attributes: ['clickNum', 'carbonReduction'],
                    include: {
                      model: user,
                      where: {
                        id : findUser.dataValues.id
                      }
                    },
                    where: {
                        userId: findUser.dataValues.id
                    }
                });
        
                  if(getInfo){
                    res.status(200).send(getInfo)
                  } else {
                    res.status(500).send('err')
                  }
            }

        } else if(clickNum !== 0){
            const findUpdateUser = await user.findOne({
                where: {
                    email: email
                }
            })    
            // 처음 클릭 이후부터는 클릭한 유저의 정보를 가져와 기존에 생성한 badges를 업데이트하기만 하면 됨
            await badge.update({
                clickNum: clickNum + 1,
                carbonReduction: carbon(clickNum + 1),
            },{    
            // },{   
            //     include: [{
            //         model: user,
            //         where: {
            //           id : findUpdateUser.dataValues.id
            //         }
            //     }],    
            // },{
                where: {
                    userId: findUpdateUser.dataValues.id
                }
            })
             //업데이트 이후 마찬가지로 유저 id에 해당하는 유저 정보와 뱃지 정보를 가져옴
            const getUpdateInfo = await badge.findOne({
                attributes: ['clickNum', 'carbonReduction'],
                include: {
                  model: user,
                  where: {
                    id : findUpdateUser.dataValues.id
                  }
                },
                where: {
                    userId: findUpdateUser.dataValues.id
                }
            })
            console.log(getUpdateInfo)
            const levelStandard = getUpdateInfo.dataValues.clickNum;
            //const badgeStandard = getUpdateInfo.carbonReduction;

            // 클릭 수에 따라 조건에 맞는 레벨 정보를 조회해서 전송
            // 레벨 1은 기본값으로 클라에서 저장
            if(levelStandard <= 10){
                const level = await levelinfo.findOne({
                    where: { id: 1}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 10 && levelStandard <= 15){
                const level = await levelinfo.findOne({
                    where: { id: 2}
                })
                res.status(200).send({getUpdateInfo, level})
                // 여기서 클라로 전송할 때는 클릭수, 탄소 외 레벨과 벳지의 정보도 같이 준다 (조건에 따라)
                //res.status(200).send({getUpdateInfo, 레벨관련, 뱃지관련})
            } else if(levelStandard > 15 && levelStandard <= 25){
                const level = await levelinfo.findOne({
                    where: { id: 3}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 25 && levelStandard <= 40){
                const level = await levelinfo.findOne({
                    where: { id: 4}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 40 && levelStandard <= 60){
                const level = await levelinfo.findOne({
                    where: { id: 5}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 60 && levelStandard <= 85){
                const level = await levelinfo.findOne({
                    where: { id: 6}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 85 && levelStandard <= 115){
                const level = await levelinfo.findOne({
                    where: { id: 7}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 115 && levelStandard <= 150){
                const level = await levelinfo.findOne({
                    where: { id: 8}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 150 && levelStandard <= 190){
                const level = await levelinfo.findOne({
                    where: { id: 9}
                })
                res.status(200).send({getUpdateInfo, level})
            } else if(levelStandard > 190 && levelStandard <= 235){
                const level = await levelinfo.findOne({
                    where: { id: 10}
                })
                res.status(200).send({getUpdateInfo, level})
            }
        } else {
            res.status(400).send('에러입니다')
        }
    
    },    
}    