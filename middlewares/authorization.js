const { Product } = require("../models");

const ProductAuthorization = async (req, res, next) => {
  try {
    const { role, id } = req.user;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (product) {
      if (id != product.UserId && role !== "admin")
        throw { name: "Unauthorized", status: 403 };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const suAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") throw { name: "Unauthorized", status: 403 };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { ProductAuthorization, suAuthorization };
