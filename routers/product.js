const productController = require("../controllers/product");
const authentication = require("../middlewares/authentication");
const productAuthorization = require("../middlewares/authorization");

const router = require("express").Router();

router.use(authentication)

router.get("/product", productController.getAllProduct);
router.get("/product/:id", productController.getProductById);

router.use(productAuthorization)

router.post("/product", productController.createProduct);
router.put("/product:id", productController.updateProduct);
router.delete("/product:id", productController.deleteProduct);
router.patch("/product/:id", productController.uploadFile);


module.exports = router;