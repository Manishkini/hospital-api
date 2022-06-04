const Doctor = require('../models/doctor');
const Crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Username and password is required!');
  }
  Doctor.findOne(
    {
      username: req.body.username,
    },
    (err, doctor) => {
      if (err) {
        return res
          .status(403)
          .send('something went wrong while finding doctor');
      }
      if (doctor) {
        return res.status(400).send('Doctor alreadt present.');
      }
      const encryptedPassword = Crypto.AES.encrypt(
        req.body.password,
        'pandemic'
      ).toString();
      Doctor.create(
        {
          username: req.body.username,
          password: encryptedPassword,
        },
        (errCreation, newDoctor) => {
          if (errCreation) {
            return res
              .status(403)
              .send('something went wrong while creating doctor');
          }
          if (newDoctor) {
            return res
              .status(200)
              .send('account created successfully! please log in');
          }
        }
      );
    }
  );
};

module.exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Username and password is required!');
  }
  Doctor.findOne(
    {
      username: req.body.username,
    },
    (err, doctor) => {
      if (err) {
        return res
          .status(403)
          .send('something went wrong while finding doctor');
      }
      if (!doctor) {
        return res.status(400).send('User not found.');
      } else {
        const decryptedPassword = Crypto.AES.decrypt(
          doctor.password,
          'pandemic'
        ).toString(Crypto.enc.Utf8);
        if (decryptedPassword !== req.body.password) {
          return res.status(400).send('Password not Matched.');
        }
        return res.status(200).send({
          massage: 'logged in successfully!',
          token: jwt.sign(doctor.toJSON(), 'pandemic', { expiresIn: '1h' }),
        });
      }
    }
  );
};
