const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ state: false, message: "Access denied. No token provided" });
  }

  try {
    const authToken = token.split(" ")[1];
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ state: false, message: "Invalid token." });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.permission === process.env.USER_ADMIN_ROLE) {
    next();
  } else {
    return res.status(403).json({
      status: "faild",
      message: "Access denied. You do not have the required role.",
    });
  }
};

exports.isWritter = (req, res, next) => {
  if (req.user.permission === process.env.USER_WRITTER_ROLE) {
    next();
  } else {
    return res
      .status(403)
      .send("Access denied. You do not have the required role.");
  }
};
