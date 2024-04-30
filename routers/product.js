const productController = require("../controllers/product");
const authentication = require("../middlewares/authentication");
const productAuthorization = require("../middlewares/authorization");


const multer = require('multer');
const router = require("express").Router();

const upload = multer({storage : multer.memoryStorage()})

router.use(authentication)

router.get("/product", productController.getAllProduct);
router.get("/product/:id", productController.getProductById);

router.use(productAuthorization)

router.post("/product", productController.createProduct);
router.put("/product:id", productController.updateProduct);
router.delete("/product:id", productController.deleteProduct);
router.patch("/product/:id", upload.single("file"), productController.uploadFile);


module.exports = router;