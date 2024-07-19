const { default: mongoose } = require("mongoose");

const connectToDb = async () => {
  const connectionURL =
    "mongodb+srv://alok953280:5cGy73VBWrTDzlAL@cluster0.wzglyyp.mongodb.net/";

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Job board database connected succesfully"))
    .catch((error) => console.log(error));
};
