const express = require("express");
const path = require("path");
const { USER, checkRecaptcha } = require("./util.js");

const app = express();

app.use(express.json());

app.use("/api/check-user", async (req, res) => {
  console.log(req.body);
  const {
    email,
    password,
    verification: { isVerified, shouldVerify, value },
  } = req.body;
  const isUser = email === USER.email && password === USER.password;

  if (!isUser || (shouldVerify && !isVerified)) {
    return res.status(200).json({
      error: "Please check your credentials and try again.",
    });
  }

  if (!shouldVerify) {
    return res.status(200).json({
      message: "Successful entry!",
      error: null,
    });
  }

  if (shouldVerify) {
    try {
      const { error, message } = await checkRecaptcha(value);
      return res.status(200).json({ error, message });
    } catch (err) {
      return res.status(200).json({
        error: "We couldn't verify that you are not a robot. Please try again.",
        message: null,
      });
    }
  }
});

app.use(express.static("client/build")); //serving production assets

app.get("*", (req, res) => {
  //serving html file
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
