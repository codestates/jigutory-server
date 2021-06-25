const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const db = require('../models/index');
require("dotenv").config();
const { user, product, order, levelinfo, cafeinfo, badgeinfo, badge } = require("../models"); 


module.exports = {

    signinController: async (req, res) => {
    
    },    

    signupController: async (req, res) => {
    
    },

    googlesigninController: async (req, res) => {
    
    },

    googlesignupController: async (req, res) => {
    
    },

    kakaosigninController: async (req, res) => {
    
    },

    kakaosignupController: async (req, res) => {
    
    },

}    