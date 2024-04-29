const userController = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const { userAuthorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/login", userController.login);

router.use(authentication);
router.post("/register", userAuthorization, userController.register);

module.exports = router;