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

    var today = [];

    await customers.forEach((customer) => {
      let tdy = customer.queData.filter(
        (que) =>
          new Date(que.createdAt).toLocaleDateString() ===
          new Date().toLocaleDateString()
      );
      if (tdy.length !== 0) {
        // customer.tran = tdy[0].transactionType;
        // customer.time = new Date(tdy[0].createdAt).toLocaleTimeString();
        // console.log(customer);
        today.push(customer);
      }
    });

    return res.status(200).json({
      success: 1,
      data: customers,
      que: today,
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
