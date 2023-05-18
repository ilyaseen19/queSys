const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.post("/uploadData", async (req, res) => {
  try {
    var customers = await Customer.find();
    var data = req.body;

    var newData = [];

    data.forEach(async (item) => {
      if (item.IDNumber !== "" || item.phoneNumber !== "") {
        if (
          customers.some((customer) => customer.IDNumber === item.IDNumber) ||
          customers.some(
            (customer) => customer.phoneNumber === item.phoneNumber
          )
        ) {
          let cust = customers.find(
            (custo) => custo.phoneNumber === item.phoneNumber
          );

          let qData = [
            ...cust.queData,
            { transactionType: item.transactionType },
          ];

          await Customer.updateOne(
            { _id: cust._id },
            {
              $set: {
                queData: qData,
              },
            }
          );
        } else {
          newData.push(item);
        }

        return;
      }
    });

    if (newData.length === 0)
      return res.status(201).json({
        success: 2,
        message: "Data updated successfully",
      });

    let saved = await Customer.insertMany(newData);
    return res.status(201).json({
      success: 1,
      data: saved,
      message: "Data uploaded successfully",
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
