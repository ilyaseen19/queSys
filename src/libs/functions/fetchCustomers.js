import { baseUrl } from "../../data";

const getCustomers = async (data) => {
  const url = baseUrl + "getAllCustomers";

  var results = {};

  await fetch(url)
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      console.log(error);
      return (results = {
        success: 0,
        message:
          "Could not fetch Data, make sure you are connected to the internet",
      });
    });

  return results;
};

export { getCustomers };
