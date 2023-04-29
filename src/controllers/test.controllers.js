const Test = require("../models/test.models");
const { createError } = require("../utils/error");
const testAdd = async (req, res) => {
  try {
    haha = "HAHAHAHAHAHA";
    console.log(haha);
    const newTest = new Test({
      ...req.body,
    });
    await newTest.save();
    console.log("Saved Sucessfully");

    res.status(200).json({ message: "Hello There!", Added: newTest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR", Error: err.message });
  }
};

const testGetAll = async (req, res) => {
  try {
    const allTest = await Test.find();
    haha = "HAHAHAHAHAHA";
    console.log(haha);
    res.status(200).json({ message: "Hello There!", Found: allTest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR", Error: err.message });
  }
};

const testGetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const test = await Test.findById(id);
    haha = "HAHAHAHAHAHA";
    console.log(haha);
    res.status(200).json({ message: "Hello There!", Found: test });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR", Error: err.message });
  }
};

module.exports = { testAdd, testGetAll, testGetOne };
