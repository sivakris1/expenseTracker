const express = require('express');
const accountStatsCtrl = require('../../controllers/accountStatistics/accountStatistics');
const authMiddleware = require('../../middleware/AuthMiddleware');

const accountStasRoute = express.Router();

accountStasRoute.get('/accounts-statistics',authMiddleware,accountStatsCtrl)


module.exports = accountStasRoute