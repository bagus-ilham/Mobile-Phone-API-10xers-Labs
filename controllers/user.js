const { comparePassword, signToken } = require("../helpers");
const { User } = require("../models");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;

      if (!username || !email || !password || !phoneNumber) {
        throw {
          name: "Username, email, password or phone number required",
          status: 400,
        };
      }
      const registeredUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (registeredUser) {
        throw { name: "Email already registered", status: 400 };
      }
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "Email or password required", status: 400 };
      }
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      const checkPassword = comparePassword(password, user.password);

      if (!user || !checkPassword) {
        throw { name: "Invalid email or password", status: 401 };
      }

      const accessToken = signToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
