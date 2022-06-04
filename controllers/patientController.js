const Patient = require('../models/patient');
const Report = require('../models/report');

module.exports.register = (req, res) => {
  if (!req.body.phoneno) {
    if (req.body.phoneno.split('').length != 10) {
      return res.status(400).send('Please enter valid phone number');
    }
    return res.status(400).send('Patients phone number is required!');
  }

  Patient.findOne(
    {
      phoneno: req.body.phoneno,
    },
    (err, patient) => {
      if (err) {
        return res
          .status(403)
          .send('something went wrong while finding patient');
      }
      if (patient) {
        return res.status(200).send({
          massage: 'Patient is already registered',
          patient_id: patient.id,
        });
      } else {
        Patient.create(
          {
            phoneno: req.body.phoneno,
            createdBy: req.user._id,
          },
          (errCreation, newPatient) => {
            if (errCreation) {
              console.log('errCreation', errCreation);
              return res
                .status(403)
                .send('something went wrong while creating patient');
            }
            if (newPatient) {
              return res.status(200).send({
                massage: 'Patient registered successfully!',
                patient_id: newPatient.id,
              });
            }
          }
        );
      }
    }
  );
};

module.exports.create_report = (req, res) => {
  if (!req.body.status) {
    return res.status(400).send('status is required!');
  }
  Patient.findById(req.params.id, (err, patient) => {
    if (err) {
      return res.status(403).send('something went wrong while finding patient');
    }
    if (patient) {
      Report.create(
        {
          patient: patient._id,
          createdBy: req.user._id,
          status: req.body.status,
          date: new Date(),
        },
        async (err, report) => {
          if (err) {
            return res
              .status(403)
              .send('something went wrong while creating report');
          }
          if (report) {
            patient.reports.push(report._id);
            await patient.save();
            return res.status(200).send({
              massage: 'Report is created successfully!',
              report_id: report._id,
            });
          }
        }
      );
    } else {
      return res.status(403).send('Patient not found!');
    }
  });
};

module.exports.all_reports = (req, res) => {
  Patient.findById(req.params.id)
    .populate('createdBy')
    .populate({
      path: 'reports',
      populate: {
        path: 'createdBy',
        model: 'doctor',
      },
      options: { sort: { createdAt: -1 } },
    })
    .exec((err, docs) => {
      if (err) {
        return res
          .status(403)
          .send('something went wrong while finding report');
      }
      return res.status(200).send({
        data: docs,
      });
    });
};
