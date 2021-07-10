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
    // 레벨에서 클릭 수와 탄소저감 수치 두개 다 db에 업데이트하고 클라로 전송
    // 뱃지에서는 단지 그 수치를 버튼을 클릭하든 뭘 해서 전달해주기만 하면 됨

    readController: async (req, res) => {

        const { clickNum, email } = req.body;
        const carbon = (num) =>  num * 25

        // users와 badges가 일대일로 연결된 스키마 가정 (badges에는 userId 외래키 있음)

        if(clickNum === 0){
            // 유저가 로그인해서 맨 처음에 클릭했을 때 작동 
            // req.body로 보내준 email으로 로그인한 유저의 정보를 가져옴
            const findUser = await user.findOne({
                where: {
                  email: email
                }

            })
            console.log(findUser.dataValues.id)
       
            // 위에서 조회한 유저의 정보로 badge테이블 생성
            // 어차피 처음은 무조건 레벨이 1이니까 badges 테이블의 levelNum을 1로 저장
            const submitBadge = await badge.create({
                clickNum: clickNum + 1,
                carbonReduction: carbon(clickNum + 1),
                levelNum: 1,
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
                // 유저 id에 해당하는 유저 정보, clickNum, carbonReduction, levelNum을 전송
                // 클라는 전송된 정보를 화면에 출력

                const getInfo = await badge.findOne({
                    attributes: ['clickNum', 'carbonReduction', 'levelNum'],
                    include: {
                        model: user,
                        where: {
                            id: findUser.dataValues.id,
                        },
                    },
                    where: {
                        userId: findUser.dataValues.id,
                    },
                })

                if (getInfo) {
                    res.status(200).send(getInfo)
                } else {
                    res.status(500).send('err')
                }
            }

        } else if(clickNum !== 0){
            // 마찬가지로 유저를 찾고

            const findUpdateUser = await user.findOne({
                where: {
                  email: email
                }
            })    
            // 조회한 유저와 맞는 badges 테이블의 정보도 조회
            const findUpdateInfo = await badge.findOne({
                attributes: ['clickNum', 'carbonReduction', 'levelNum'],
                include: {
                    model: user,
                    where: {
                        id: findUpdateUser.dataValues.id,
                    },
                },
                where: {
                    userId: findUpdateUser.dataValues.id,
                },
            })
            // console.log('clickNum :'+ findUpdateInfo.dataValues.clickNum)
            // console.log('levelNum :'+ findUpdateInfo.dataValues.levelNum)
            // 여기에서 이슈가, req.body로 전달하는 clickNum, carbonReduction과 
            // levelNum의 업데이트 차이가 발생하여 아래처럼 업데이트하는 로직을 나누었음
            const levelStandard = findUpdateInfo.dataValues.clickNum;
            // console.log('levelstandard :' + levelStandard);
            // 레벨이 상승해야 하는 부분의 클릭 수에서는 레벨도 1씩 더해주고
            // 그게 아닌 경우에는 clickNum과 carbonReduction만 1씩 더해준다

            if([10,15,25,40,60,85,115,150,190].includes(levelStandard)){
                const findlevelNum = await badge.findOne({
                    where: {
                        userId: findUpdateUser.dataValues.id
                    }
                })
                await badge.update({
                    clickNum: clickNum + 1,
                    carbonReduction: carbon(clickNum + 1),
                    levelNum: findlevelNum.dataValues.levelNum + 1
                },{    
                    where: {
                        userId: findUpdateUser.dataValues.id
                    }
                })
                const getUpdateInfo = await badge.findOne({
                    attributes: ['clickNum', 'carbonReduction', 'levelNum'],
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
                res.status(200).send(getUpdateInfo)
            } else {
                const findlevelNum = await badge.findOne({
                    where: {
                        userId: findUpdateUser.dataValues.id
                    }
                })
                await badge.update({
                    clickNum: clickNum + 1,
                    carbonReduction: carbon(clickNum + 1),
                    levelNum: findlevelNum.dataValues.levelNum
                },{    
                    where: {
                        userId: findUpdateUser.dataValues.id
                    }
                })
                const getUpdateInfo = await badge.findOne({
                    attributes: ['clickNum', 'carbonReduction', 'levelNum'],
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
                res.status(200).send(getUpdateInfo)

            }
        }   
        // 여기서 문제는, levelNum에 저장되어 있는 레벨은 단지 숫자일뿐 이 정보로 levelinfo의 레벨
        // 정보를 보낼 수가 없다. 새로고침 시 레벨이 없어지는 문제를 해결하기 위해서는 레벨의 숫자는 levelNum을
        // 통해 계속 보여지게 하고, 레벨의 정보는 클릭 시 따른 api를 통해 전달하게 해야 할 것 같음
         



        //     // 처음 클릭 이후부터는 클릭한 유저의 정보를 가져와 기존에 생성한 badges를 업데이트하기만 하면 됨
        //     await badge.update({
        //         clickNum: clickNum + 1,
        //         carbonReduction: carbon(clickNum + 1),
        //         levelNum: findUpdateLevel.dataValues.id
        //     },{    
        //     // },{   
        //     //     include: [{
        //     //         model: user,
        //     //         where: {
        //     //           id : findUpdateUser.dataValues.id
        //     //         }
        //     //     }],    
        //     // },{
        //         where: {
        //             userId: findUpdateUser.dataValues.id
        //         }
        //     })
        //      //업데이트 이후 마찬가지로 유저 id에 해당하는 유저 정보와 뱃지 정보를 가져옴
        //      // getupdateinfo에 levelNum에 레벨정보가 있으니까 이것도 보낸다
        //     const getUpdateInfo = await badge.findOne({
        //         attributes: ['clickNum', 'carbonReduction'],
        //         include: {
        //           model: user,
        //           where: {
        //             id : findUpdateUser.dataValues.id
        //           }
        //         },
        //         where: {
        //             userId: findUpdateUser.dataValues.id
        //         }
        //     })
        //     console.log(getUpdateInfo)
        //     const levelStandard = getUpdateInfo.dataValues.clickNum;
        //     //const badgeStandard = getUpdateInfo.carbonReduction;

        //     // 클릭 수에 따라 조건에 맞는 레벨 정보를 조회해서 전송
        //     // 레벨 1은 기본값으로 클라에서 저장
        //     if(levelStandard <= 10){
        //         const level = await levelinfo.findOne({
        //             where: { id: 1}
        //         })
        //         res.status(200).send({getUpdateInfo, level, findUpdateLevel})
        //     } else if(levelStandard > 10 && levelStandard <= 15){
        //         const level = await levelinfo.findOne({
        //             where: { id: 2}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //         // 여기서 클라로 전송할 때는 클릭수, 탄소 외 레벨과 벳지의 정보도 같이 준다 (조건에 따라)
        //         //res.status(200).send({getUpdateInfo, 레벨관련, 뱃지관련})
        //     } else if(levelStandard > 15 && levelStandard <= 25){
        //         const level = await levelinfo.findOne({
        //             where: { id: 3}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 25 && levelStandard <= 40){
        //         const level = await levelinfo.findOne({
        //             where: { id: 4}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 40 && levelStandard <= 60){
        //         const level = await levelinfo.findOne({
        //             where: { id: 5}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 60 && levelStandard <= 85){
        //         const level = await levelinfo.findOne({
        //             where: { id: 6}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 85 && levelStandard <= 115){
        //         const level = await levelinfo.findOne({
        //             where: { id: 7}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 115 && levelStandard <= 150){
        //         const level = await levelinfo.findOne({
        //             where: { id: 8}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 150 && levelStandard <= 190){
        //         const level = await levelinfo.findOne({
        //             where: { id: 9}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     } else if(levelStandard > 190 && levelStandard <= 235){
        //         const level = await levelinfo.findOne({
        //             where: { id: 10}
        //         })
        //         res.status(200).send({getUpdateInfo, level})
        //     }
        // } else {
        //     res.status(400).send('에러입니다')
        // }
    
    },    
    infoController: async (req, res) => {
        // req.body로 현재 레벨의 숫자를 서버로 보내주면
        const { levelNum } = req.body;

        if(levelNum === 1){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 2){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 3){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 4){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 5){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 6){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 7){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 8){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 9){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else if(levelNum === 10){
            const level = await levelinfo.findOne({
                where: { id: levelNum }
            })
            res.status(200).send(level)
        } else {
            res.status(400).send('에러입니다')
        }

    }    
}    

