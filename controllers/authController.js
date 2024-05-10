const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const { User, UserPermission, Writter } = require("../models");
const {
  sendVerificationOnEmail,
  sendVerificationOnPhone,
} = require("../core/fun/verification");

const signUp = async (req, res) => {
  try {
    //hash the password before saving the user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      UPassword: hashedPassword,
      isEmailVerified: false, //temp
      userPermissionId: 3,
    });

    res.status(200).json({
      state: true,
      message: "Signed Up Successfuly...",
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(409).json({ state: false, message: "Already exists." });
    } else {
      res.status(500).json({ state: false, message: error.message });
    }
  }
};

const logIn = async (req, res) => {
  const { phoneEmail, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: phoneEmail }, { phone: phoneEmail }],
      },
      include: [UserPermission, Writter],
    });
    if (!user) {
      return res
        .status(400)
        .json({ state: false, message: "This User Not Exist." });
    }
    const validPassword = await bcrypt.compare(password, user.UPassword);
    if (!validPassword) {
      return res
        .status(400)
        .json({ state: false, message: `wrong password for ${user.email}` });
    }
    if (user.isStoped) {
      return res.status(400).json({
        state: false,
        message:
          user.notification ?? "Can Not Log In :you are atoped currnetly",
      });
    }
    if (user.isEmailVerified || user.isPhoneVerified) {
      const tokUser = {
        Id: user.Id,
        name: user.UName,
        email: user.email,
        phone: user.phone,
        permission: user.userPermission.permission,
        writterId: user.writter ? user.writter.Id : null,
        isWritterStoped: user.writter ? user.writter.isStoped : false,
      };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(tokUser, secret, { expiresIn: "24h" });
      delete tokUser.writterId;
      if (tokUser.email) {
        delete tokUser.phone;
      } else {
        delete tokUser.email;
      }
      // res.cookie("token", token, { httpOnly: true });
      // res.cookie("user", tokUser);
      return res.status(200).json({
        state: true,
        isVerified: true,
        message: "Loged In Successfuly \n Wait Will Redirect You To Home",
        user: tokUser,
        token,
      });
    } else {
      const secret = process.env.JWT_SECRET;
      if (user.phone === phoneEmail) {
        const phoneToken =
          "http://" +
          process.env.APP_DOMAIN +
          ":4444/api/auth/verify/?token=" +
          jwt.sign({ phoneEmail: user.phone }, secret, {
            expiresIn: "1h",
          });
        sendVerificationOnPhone(req, res, user.phone, phoneToken);
      } else {
        const emailToken =
          "http://" +
          process.env.APP_DOMAIN +
          ":4444/api/auth/verify/?token=" +
          jwt.sign({ phoneEmail: user.email }, secret, {
            expiresIn: "1h",
          });
        sendVerificationOnEmail(req, res, user.email, emailToken);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      state: false,
      error: "Internal Server Error",
    });
  }
};

// Other controller functions (e.g. logoutUser, resetPassword, changePassword)...

const logOut = async (req, res) => {
  //Logout will be performed by deleting JWT token client-side
  res.json({
    message:
      "Please delete your token. No server-side action can be performed.",
  });
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ where: { Id: req.user.Id } });
    if (!user) {
      return res.status(400).json({ state: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(oldPassword, user.UPassword);
    if (!validPassword) {
      return res
        .status(400)
        .json({ state: false, message: "Password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ state: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ state: false, message: error.message });
  }
};

const foregetpassword = async (req, res) => {
  const { phoneEmail } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: phoneEmail }, { phone: phoneEmail }],
      },
      attributes: ["email", "phone"],
    });

    if (!user) {
      return res.status(400).json({ state: false, message: "no user." });
    }
    const secret = process.env.JWT_SECRET;
    if (user.phone === phoneEmail) {
      const phoneToken =
        "To Reset Your Password Click This URL " +
        "http://" +
        process.env.APP_DOMAIN +
        ":3000/resetpassword?token=" +
        jwt.sign({ phoneEmail: user.phone }, secret, {
          expiresIn: "1h",
        });
      sendVerificationOnPhone(req, res, user.phone, phoneToken);
    } else {
      const emailToken =
        "To Reset Your Password Click This URL " +
        "http://" +
        process.env.APP_DOMAIN +
        ":3000/resetpassword?token=" +
        jwt.sign({ phoneEmail: user.email }, secret, {
          expiresIn: "1h",
        });
      sendVerificationOnEmail(req, res, user.email, emailToken);
    }
  } catch (error) {
    res.status(400).json({ state: false, message: error.message });
  }
};

const verifyEmailPhone = async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ state: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { phoneEmail } = decoded;
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email: phoneEmail }, { phone: phoneEmail }],
      },
    });
    if (user) {
      if (user.phone === phoneEmail) {
        await User.update(
          { isPhoneVerified: true },
          {
            where: { Id: user.Id },
          }
        );
        return res
          .status(200)
          .json({ state: true, message: "Phone Verified Successfuly" });
      } else {
        await User.update(
          { isEmailVerified: true },
          {
            where: { Id: user.Id },
          }
        );
        return res.status(200).json({
          state: true,
          message: "Email Verified Successfuly",
        });
      }
    } else {
      res.status(400).json({ state: false, message: "Invalid token." });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token) {
    return res.status(401).json({ state: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { phoneEmail } = decoded;

    if (phoneEmail) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { UPassword: hashedPassword },
        {
          where: {
            [Sequelize.Op.or]: [{ email: phoneEmail }, { phone: phoneEmail }],
          },
        }
      );

      return res
        .status(200)
        .json({ state: true, message: "Password Updated Successfuly" });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

module.exports = {
  logIn,
  signUp,
  logOut,
  changePassword,
  resetPassword,
  foregetpassword,
  verifyEmailPhone,
};
