const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hasPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (plain, hashPassword) =>
  bcrypt.compareSync(plain, hashPassword);

const signToken = (payload) => jwt.sign(payload, process.env.jwt_secret);

const verifyToken = (token) => jwt.verify(token, process.env.jwt_secret);

module.exports = {
  hasPass,
  comparePassword,
  signToken,
  verifyToken,
};
