const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patient',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Negative',
        'Travelled-Quarantine',
        'Symptoms-Quarantine',
        'Positive-Admit',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
