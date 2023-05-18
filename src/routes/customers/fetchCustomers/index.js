const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.get("/getAllCustomers", async (req, res) => {
  try {
    var customers = await Customer.find();

    if (!customers.length)
      return res.status(404).json({
        success: 0,
        data: [],
        message: "No results found",
      });

    return res.status(200).json({
      success: 1,
      data: customers,
      message: "Data retreived successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: 0,
      message: "internal error",
      error: error,
    });
  }
});

module.exports = router;
