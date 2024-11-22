const express = require("express");

const router = express.Router();

const {
  viewUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", viewUserProfile);
router.put("/", updateUserProfile);
router.delete("/", deleteUserProfile);

module.exports = router;
