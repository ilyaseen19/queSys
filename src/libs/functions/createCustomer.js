import { baseUrl } from "../../data";

const createCustomer = async (data) => {
  const url = baseUrl + "createCustomer";
  var result = {};

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      queData: { transactionType: data.transactionType },
      fullName: data.fullName,
      IDNumber: data.IDNumber,
      phoneNumber: data.phoneNumber,
      IDType: data.idType,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
     return result = res;
    })
    .catch((err) => {
      console.log(err);
      result = {
        success: 0,
        message: err,
        statusCode: 501,
      };
    });

  return result;
};

export { createCustomer };
