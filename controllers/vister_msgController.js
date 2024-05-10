const { VisterMsg } = require("../models");
const multer = require("multer");
const path = require("path");

const getVistersMsgs = async (req, res) => {
  try {
    const { page, isReaded } = req.query;
    const { count, rows } = await VisterMsg.findAndCountAll({
      where: { isReaded: isReaded === "true" },
      order: [["updatedAt", "DESC"]],
      offset: page * 20,
      limit: 20,
    });
    res.status(200).json({ state: true, messages: rows, count });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const getVisterMsg = async (req, res) => {
  try {
    const message = await VisterMsg.findOne({
      where: { Id: req.params.id },
    });
    res.status(200).json({ state: true, message });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const addVisterMsg = async (req, res) => {
  try {
    await VisterMsg.create(req.body);
    res.cookie("isFeedbackSent", true, { maxAge: 8640000, httpOnly: true });
    res
      .status(200)
      .json({ state: true, message: "Your message sent successfuly" });
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};
const updateVisterMsg = async (req, res) => {
  try {
    const resualt = await VisterMsg.update(req.body, {
      where: { Id: Number.parseInt(req.params.id) },
    });
    if (resualt[0]) {
      res
        .status(200)
        .json({ state: true, message: "Vister Msg Updated Successfully" });
    } else {
      res
        .status(400)
        .json({ state: false, message: "Some thing went wrong.." });
    }
  } catch (error) {
    res.status(500).json({ state: false, message: error.message });
  }
};

const deleteVisterMsg = async (req, res) => {
  try {
    const result = await VisterMsg.destroy({
      where: { Id: Number.parseInt(req.params.id) },
    });
    if (result) {
      res
        .status(200)
        .json({ state: true, message: "The Vister Msg Deleted Successfully" });
    } else {
      res.status(404).json({
        state: false,
        message: "Article not found or is published",
      });
    }
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};

module.exports = {
  getVistersMsgs,
  getVisterMsg,
  addVisterMsg,
  updateVisterMsg,
  deleteVisterMsg,
};
