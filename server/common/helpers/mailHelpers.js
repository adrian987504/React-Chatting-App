const verifyUrl = verificationToken => (
  (process.env.NODE_ENV === 'development')
    ? `localhost:3000/verify/${verificationToken}`
    : `${process.env.HOST}/verify/${verificationToken}`
);

const resetUrl = resetToken => (
  (process.env.NODE_ENV === 'development')
    ? `localhost:3000/reset/${resetToken}`
    : `${process.env.HOST}/reset/${resetToken}`
);

module.exports = {
  verifyUrl,
  resetUrl
};
