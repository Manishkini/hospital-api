const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    phoneno: {
      type: Number,
      max: 10,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;
