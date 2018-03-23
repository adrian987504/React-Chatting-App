const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const helpers = require('./../helpers/mailHelpers');

let transport = null;

if (process.env.NODE_ENV === 'production') {
  aws.config.loadFromPath('aws-credentials.json');
  transport = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: '2010-12-01'
    })
  });
} else if (process.env.NODE_ENV === 'development') {
  transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
}

const generateHtml = (template, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../emails/${template}.pug`, options);
  const inlined = juice(html);
  return inlined;
};

const send = (options) => {
  const html = generateHtml(options.template, { ...options, h: helpers });
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: 'Meet Direct <support@meet.direct>',
    to: options.user.email,
    subject: options.subject || '',
    html,
    text
  };

  const sendPromise = promisify(transport.sendMail, transport);

  return sendPromise(mailOptions);
};

exports.send = send;
