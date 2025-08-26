const express = require('express');
const accountStatsCtrl = require('../../controllers/accountStatistics/accountStatistics');
// const accountStasCtrl = require('../../controllers/accountStatistics/accountStatistics.js')

const accountStasRoute = express.Router();

accountStasRoute.get('/accounts-statistics',accountStatsCtrl)


module.exports = accountStasRoute