const { Product, User } = require("../models");

class productController {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        exclude: ["createdAt", "updatedAt"],
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const product = await Product.findByPk({
        where: {
          id: req.params.id,
        },
        exclude: ["createdAt", "updatedAt"],
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      });

      if (!product) {
        throw { name: "Data not found", status: 404 };
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req, res, next) {
    try {
      const { name, description, price, stock, image } = req.body;
      if (!name || !description || !price || !stock || !image) {
        throw { name: "All field canot be empty", status: 400 };
      }

      await Product.create({
        name,
        description,
        price,
        stock,
        image,
        UserId: req.user.id,
      });

      const regiteredProduct = await Product.findOne({
        where: {
          name,
        },
        exclude: ["createdAt", "updatedAt"],
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      });
      res
        .status(201)
        .json({ regiteredProduct, msg: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params.id;
      const product = await productController.getProductById(id);

      await product.update(req.body);

      const updatedProduct = await productController.getProductById(id);

      res
        .status(200)
        .json({ updatedProduct, msg: "Product Updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params.id;

      const product = await productController.getProductById(id);

      await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({ product, msg: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async uploadFile(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productController;
