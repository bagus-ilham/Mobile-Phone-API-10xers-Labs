const productController = require("../controllers/product");
const authentication = require("../middlewares/authentication");
const productAuthorization = require("../middlewares/authorization");


const multer = require('multer');
const router = require("express").Router();

const upload = multer({storage : multer.memoryStorage()})

router.use(authentication)

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);

router.use(productAuthorization)

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", upload.single("file"), productController.uploadFile);


module.exports = router;