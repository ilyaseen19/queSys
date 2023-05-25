import { baseUrl } from "../../data";

const uploadFiles = async (data) => {
  const url = baseUrl + "uploadData";

  var dataToupLoad = [];

  data.forEach((item) => {
    if (item.IDNumber !== "" || item.phoneNumber !== "") {
      dataToupLoad.push(item);
    }
  });

  var results = {};

  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(dataToupLoad),
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = res);
    })
    .catch((error) => {
      console.log(error);
      return (results = {
        success: 0,
        message: error,
      });
    });

  return results;
};

export { uploadFiles };
