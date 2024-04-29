const userController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", userController.login);

router.use(authentication);
router.post("/register", userController.register);

module.exports = router;