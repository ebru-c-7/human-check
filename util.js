const axios = require("axios");

const { KEYS } = process.env.SECRET_KEY ? { KEYS: null } : require("./key.js");

exports.USER = {
  email: "test@test.com",
  password: "test",
};

exports.checkRecaptcha = async (value) => {
  const secretKey = process.env.SECRET_KEY || KEYS.recaptcha.SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${value}`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  };

  try {
    const response = await axios.post(url, {}, { headers });
    console.log(response.data);
    const { success } = response.data;
    if (!success) throw new Error();
    return {
      message: "Successful entry!",
      error: null,
    };
  } catch (err) {
    console.log(err, "recaptcha error");
    return {
      error: "We couldn't verify that you are not a robot. Please try again.",
      message: null,
    };
  }
};
