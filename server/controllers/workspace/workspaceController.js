const _ = require('lodash');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const { catchErrors } = require('../../utils/error');

const nodemailer = require('nodemailer');

// const {
//   validateCreateWorkspace,
// } = require('./../../common/validators/userValidators');

const Workspace = mongoose.model('Workspace');

const workspace = async (req, res, next) => {
  const workspace = Workspace.create({
    email: req.body.email,
    fullName: req.body.fullName,
    displayName: req.body.displayName,
  }, function (err, small) {
    if (err) {
      res.status(400)
         .send({msg: 'bad request'});
    } 
    console.log(workspace);
    res.send(workspace);
  });
};

const getList = async (req, res, next) => {
  Workspace.find({}, function(err, workspaces) {
    res.send(workspaces);
  });
}
const search = async (req, res, next) => {
  console.log(req.body.email);
  Workspace.find({email: req.body.email}, function(err, workspaces) {
    if (workspaces.length == 0) {
      res.status(404)
         .send({msg: 'Not found'});
    } else {
      const [workspace] = workspaces;
      const url = `https://localhost:8080/workspace/${workspace.displayName}`
      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>',
            to: req.body.email,
            subject: 'Workspace',
            text: `${url}`,
            html: `<b>${url}</b>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
      });
      res.send({url: url});
    }
  });
}
module.exports = {
  createWorkspace: [
    catchErrors(workspace)
  ],
  listWorkspace: [
    catchErrors(getList)
  ],
  searchWorkspace: [
    catchErrors(search)
  ]
};
