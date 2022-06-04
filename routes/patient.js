const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patientController');

router.post('/register', patientController.register);
router.post('/:id/create_report', patientController.create_report);
router.get('/:id/all_reports', patientController.all_reports);

module.exports = router;
