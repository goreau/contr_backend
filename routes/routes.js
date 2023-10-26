var express = require("express")
var app = express();
var router = express.Router();

var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");

var AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get('/validate', AdminAuth, HomeController.index);
router.post('/user', AdminAuth, UserController.create);
router.put('/user', AdminAuth, UserController.update);
router.put('/editUser', AdminAuth, UserController.edit);
router.post("/login", UserController.login);
router.get("/user/:id", AdminAuth, UserController.getUser);
router.get("/users", AdminAuth, UserController.getUsers);
router.delete("/user/:id", AdminAuth, UserController.remove);



module.exports = router;