const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controllers");

router.post("/", testController.testAdd);
router.get("/all", testController.testGetAll);
router.get("/:id", testController.testGetOne);

module.exports = router;
