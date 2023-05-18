const express = require("express");
const User = require("../../../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { userName, passcode } = req.body;

    const user = await User.findOne({ userName });

    if (!user)
      return res.status(404).json({
        success: 0,
        message: "Either user name or passcode is wrong",
        errorCode: 404,
      });

    if (user && user.passcode !== passcode)
      return res.status(404).json({
        success: 0,
        message: "Either user name or passcode is wrong",
        errorCode: 404,
      });

    return res.status(200).json({
      success: 1,
      message: "Logged in successfully",
      data: user,
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
