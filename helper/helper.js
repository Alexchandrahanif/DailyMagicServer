const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashingPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

// TOKEN REST API
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

const verifyAccessToken = (access_token) =>
  jwt.verify(access_token, process.env.SECRET_KEY);

module.exports = {
  hashingPassword,
  comparePassword,
  createAccessToken,
  verifyAccessToken,
};
