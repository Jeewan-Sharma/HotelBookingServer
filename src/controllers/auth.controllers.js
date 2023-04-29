const User = require("../models/Users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    });
    newUser.save();
    res.status(200).json({ message: "User has been Created!" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    });
    newUser.save();
    res.status(200).json({ message: "User has been Created!" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
