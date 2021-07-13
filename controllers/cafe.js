const { Op } = require('sequelize')
const { QueryTypes } = require('sequelize')
const db = require('../models/index')
require('dotenv').config()
const jwt = require('jsonwebtoken')
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
    cafelist: async (req, res) => {
      const getCafeInfo = await cafeinfo.findAll({
        attributes: ['id', 'name', 'image', 'address', 'keyword' ,'type', 'telephone','latitude', 'longitude','etc' , 'link']
    })
    res.status(200).send(getCafeInfo)
}
}
