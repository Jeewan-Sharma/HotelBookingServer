const User = require("../models/Users.models");
const createError = require("../utils/error");

const updateUser = async (req, res, next) => {
  try {
    const { password, ...otherDetails } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherDetails },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Updated Sucessfully!", updates: updatedUser });
  } catch (err) {
    // code for dublicate key is 11000
    if (err.code === 11000) {
      next(createError(400, "Username, Email or Number already in use"));
    } else {
      next(err);
    }
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ Message: "User has been Deleted Sucessfully" });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
