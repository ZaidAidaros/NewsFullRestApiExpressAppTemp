function sendVerificationOnEmail(req, res, email, token) {
  // empliment sending email with token url
  const emailMsg = `To Confirm your email click here:${token}  `;
  return res.status(200).json({
    status: "success",
    isVerified: false,

    emailMsg, //will delete it later
    message: "We Sent You An Email With Verify URL",
  });
}
function sendVerificationOnPhone(req, res, phone, token) {
  // empliment sending sms to phone with token url
  const emailMsg = `To Confirm your email click here: ${token} `;
  return res.status(200).json({
    status: "success",
    isVerified: false,
    emailMsg, //will delete it later
    message: "We Sent You An SMS With Verify URL",
  });
}

module.exports = {
  sendVerificationOnEmail,
  sendVerificationOnPhone,
};
