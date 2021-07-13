
const { user } = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();


module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ message: '권한이 없습니다.' })
    } else {
        try {
            const data = jwt.verify(authorization, process.env.ACCESS_SECRET)
            if (data.username !== undefined) {
                return res
                    .status(401)
                    .send({ message: '올바르지 않은 인증정보입니다.' })
            }

            const userInfo = await user.findOne({
                where: { email: data.email },
            })
            if (userInfo) {
                req.currentUserId = userInfo.id
                next(null)
            } else {
                next(null, false, { message: '올바르지 않은 인증정보입니다.' })
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}
