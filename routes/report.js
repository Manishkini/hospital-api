const express = require('express');

const router = express.Router();

const reportController = require('../controllers/reportController');

router.get('/:status', reportController.showReportsByFilter);

module.exports = router;
