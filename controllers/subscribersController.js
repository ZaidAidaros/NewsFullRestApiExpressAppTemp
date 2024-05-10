const db = require("../models");
const bcrypt = require("bcrypt");

const getAllSubscribers = async (req, res) => {
  try {
    const subscriber = await db.Subscriber.findAll();
    res.status(200).json({ state: true, subscriber });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
};

const getSubscriberById = async (req, res) => {
  try {
    const subscriber = await db.Subscriber.findOne({
      where: { Id: Number.parseInt(req.params.subscriberId) },
    });

    if (!subscriber) {
      return res
        .status(404)
        .json({ state: false, error: "subscriber not found" });
    }

    res.status(200).json({ state: true, subscriber });
  } catch (error) {
    res.status(500).json({ state: false, error: error.message });
  }
};

const addSubscriber = async (req, res) => {
  try {
    const subscriber = await db.Subscriber.create(req.body);

    res.status(200).json({ status: "success", subscriber });
  } catch (error) {
    res
      .status(201)
      .json({ status: "feild", error: error.errors[0]["message"] });
  }
};

const upDateSubscriber = async (req, res) => {
  try {
    const subscriber = await db.Subscriber.update(updateData, {
      where: { Id: Number.parseInt(req.params.subscriberId) },
    });
    res.status(200).json({ status: "success", subscriber });
  } catch (error) {
    res
      .status(201)
      .json({ status: "feild", error: error.errors[0]["message"] });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const result = await db.Subscriber.destroy({
      where: { Id: Number.parseInt(req.params.subscriberId) },
    });
    if (result) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSubscriberById,
  getAllSubscribers,
  addSubscriber,
  upDateSubscriber,
  deleteSubscriber,
};
