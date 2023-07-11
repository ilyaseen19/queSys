module.exports = {
  database:
    process.env.MONGO_URI ||
    "mongodb+srv://alfuty09:Najatullahi19@ga-hamilton.f3z1pdm.mongodb.net/queDataBase?retryWrites=true&w=majority",
  server: {
    port: process.env.PORT || 9000,
  },

  //reduse expiry time
  jwt: {
    secret: "djkfsnf63",
    expiresIn: "365d",
  },
};
