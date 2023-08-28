const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Alexandr:eez1buKqGiREs4Xh@cluster0.vwoosru.mongodb.net/contact_book?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
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
