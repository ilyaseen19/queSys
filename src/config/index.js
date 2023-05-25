module.exports = {
  database: process.env.MONGO_URI || "",
  server: {
    port: process.env.PORT,
  },

  //reduse expiry time
  jwt: {
    secret: "djkfsnf63",
    expiresIn: "365d",
  },
};
