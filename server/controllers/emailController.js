const mail = require('./../common/handlers/mailHandler');

const sendRegistrationEmail = async (req, res, next) => {
  await mail.send({
    user: res.locals.user,
    subject: 'Thanks for signing up!',
    template: 'verify-registration'
  });

  return next();
};

const sendWelcomeEmail = async (req, res, next) => {
  await mail.send({
    user: res.locals.user,
    subject: 'You can start surfing!',
    template: 'start-surfing'
  });

  return next();
};

const sendForgotPasswordEmail = async (req, res, next) => {
  await mail.send({
    user: res.locals.user,
    subject: 'Reset your password',
    template: 'forgot-password'
  });

  return next();
};

module.exports = {
  sendRegistrationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail
};
