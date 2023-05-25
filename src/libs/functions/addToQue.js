import { baseUrl } from "../../data";

const addToQue = async (data) => {
  const url = baseUrl + "addToQue/" + data._id;
  var result = {};

  fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      transactionType: data.transactionType,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      result = res;
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

export { addToQue };
