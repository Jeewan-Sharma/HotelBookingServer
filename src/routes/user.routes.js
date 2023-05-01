const express = require("express");
const router = express.Router();

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyUser, verifyAdmin } = require("../middlewares/verifyToken");

// update
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.put("/", verifyUser, getUsers);

module.exports = router;
