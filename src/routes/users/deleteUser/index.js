const express = require("express");
const User = require("../../../models/user");

const router = express.Router();

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await User.findByIdAndDelete({ _id: id });

    if (!deleted)
      return res.status(400).json({
        success: 0,
        message: "Could not delete user",
        errorCode: 400,
      });

    const users = await User.find();

    return res.status(201).json({
      success: 1,
      message: "User deleted successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: 0,
      message: "internal error",
      error: error,
      errorCode: 500,
    });
  }
});

module.exports = router;
