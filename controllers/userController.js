const { User, Writter } = require("../models");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const getCurrentUser = (req, res) => {
  try {
    const user = req.user;
    delete user.iat;
    delete user.exp;
    res.status(200).json({ state: true, user });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const getProfileData = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { Id: req.user.Id },
      attributes: ["Id", ["UName", "name"], "email", "phone"],
      include: [
        {
          model: Writter,
        },
      ],
    });
    const u = user;
    let writter = null;
    if (user.writter) {
      writter = user.writter.toJson();
    }
    delete u.writter;
    res.status(200).json({
      state: true,
      user: u,
      writter: writter,
    });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const beWritter = async (req, res) => {
  try {
    const body = req.body;
    const writter = await Writter.create({
      ...body,
      isApproved: null,
      userId: req.user.Id,
    });
    res.status(200).json({
      state: true,
      message: "Your Reuest Recived And It Under Process",
    });
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(409).json({ state: false, message: "Req Already Sent" });
    } else {
      res.status(500).json({ state: false, message: err.message });
    }
  }
};

const updateBeWritter = async (req, res) => {
  try {
    const body = req.body;
    const resualt = await Writter.update(
      {
        ...body,
        isApproved: null,
        userId: req.user.Id,
        notification: null,
      },
      { where: { userId: req.user.Id } }
    );
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Writter Info Updated Successfuly.." });
    } else {
      res
        .status(200)
        .json({ state: false, message: "Something went wrong..." });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let updateData = req.body;
    if (req.body.newPassword) {
      const newHashedPassword = await bcrypt.hash(updateData.newPassword, 10);
      updateData.UPassword = newHashedPassword;
    }
    const user = await User.findOne({
      where: { Id: req.user.Id },
      attributes: ["Id", "UPassword"],
    });
    const validPassword = await bcrypt.compare(
      updateData.oldPassword,
      user.UPassword
    );
    delete updateData.oldPassword;
    delete updateData.newPassword;
    if (validPassword) {
      if (updateData.email) {
        updateData.isEmailVerified = false;
      }
      if (updateData.phone) {
        updateData.isPhoneVerified = false;
      }
      user.update(updateData);
      user.save().then(() => {
        res
          .status(200)
          .json({ state: true, message: "User Info Updated Successfuly" });
      });
    } else {
      res.status(400).json({
        state: true,
        message: "Your Password Not Correct",
      });
    }
  } catch (error) {
    res.status(201).json({ state: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.destroy({
      where: {
        Id: req.user.Id,
        UPassword: hashedPassword,
      },
    });

    res.status(200).json({ state: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

module.exports = {
  getCurrentUser,
  getProfileData,
  beWritter,
  updateBeWritter,
  updateUser,
  deleteUser,
};
