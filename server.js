const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("oookkk");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
