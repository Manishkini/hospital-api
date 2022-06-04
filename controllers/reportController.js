const Report = require('../models/report');

module.exports.showReportsByFilter = (req, res) => {
  Report.find({
    status: req.params.status,
  })
    .populate('patient')
    .populate('createdBy')
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
