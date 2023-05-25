const express = require("express");
const Customer = require("../../../models/customer");

const router = express.Router();

router.post("/uploadData", async (req, res) => {
  try {
    var customers = await Customer.find();
    var data = req.body;

    var newData = [];

    data.forEach(async (item) => {
      if (item.IDNumber !== "" && item.phoneNumber !== "") {
        let exist = customers.find(
          (customer) =>
            customer.phoneNumber === JSON.stringify(item.phoneNumber)
        );

        if (exist) {
          let update = await Customer.updateOne(
            { phoneNumber: exist.phoneNumber },
            {
              $set: {
                queData: [
                  ...exist.queData,
                  { transactionType: item.transactionType },
                ],
              },
            }
          );
        } else {
          item.queData = [{ transactionType: item.transactionType }];
          newData.push(item);
        }
      }
    });

    if (newData.length === 0) {
      let updatedData = await Customer.find();
      return res.status(201).json({
        success: 2,
        message: "Data updated successfully",
        data: updatedData,
      });
    }

    let saved = await Customer.insertMany(newData);
    let newDbData = await Customer.find();
    return res.status(201).json({
      success: 1,
      data: newDbData,
      message: "Data uploaded successfully",
    });
  } catch (error) {
    console.log({ "internal error": error });
    res.status(500).json({
      success: 0,
      message: "internal error",
      error: error,
    });
  }
});

module.exports = router;
