const express = require('express');

const router = express.Router();

const passport = require('passport');

const patientController = require('../controllers/patientController');

router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  patientController.register
);

router.post(
  '/:id/create_report',
  passport.authenticate('jwt', { session: false }),
  patientController.create_report
);

router.get('/:id/all_reports', patientController.all_reports);

module.exports = router;
