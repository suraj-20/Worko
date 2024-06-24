const express = require("express");
const auth = require("../middleware/auth");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/worko/user", createUser);
router.get("/worko/user", auth, getAllUsers);
router.get("/worko/user/:userId", auth, getUserById);
router.put("/worko/user/:userId", auth, updateUser);
router.patch("/worko/user/:userId", auth, updateUser);
router.delete("/worko/user/:userId", auth, deleteUser);

module.exports = router;
