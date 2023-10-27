var express = require("express")
var app = express();
var router = express.Router();

var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ContratoController = require("../controllers/ContratoController");
var ProrrogaController = require("../controllers/ProrrogaController");

var AdminAuth = require("../middleware/AdminAuth");
const AuxiliarController = require("../controllers/AuxiliarController");

router.get('/', HomeController.index);
router.get('/validate', AdminAuth, HomeController.index);
router.post('/user', AdminAuth, UserController.create);
router.put('/user', AdminAuth, UserController.update);
router.put('/editUser', AdminAuth, UserController.edit);
router.post("/login", UserController.login);
router.get("/user/:id", AdminAuth, UserController.getUser);
router.get("/users", AdminAuth, UserController.getUsers);
router.delete("/user/:id", AdminAuth, UserController.remove);

router.post('/contrato', AdminAuth, ContratoController.create);
router.get("/contrato/:id", AdminAuth, ContratoController.getContrato);
router.put('/contrato', AdminAuth, ContratoController.update);
router.get("/contratos/:filter", AdminAuth, ContratoController.getContratos);
router.get("/contratosbyunid/:unid", AdminAuth, ContratoController.getContratosByUnid);
router.delete('/contrato/:id', AdminAuth, ContratoController.delete);

router.post('/prorroga', AdminAuth, ProrrogaController.create);
router.get("/prorroga/:id", AdminAuth, ProrrogaController.getProrroga);
router.put('/prorroga', AdminAuth, ProrrogaController.update);
router.get("/prorroga/:filter", AdminAuth, ProrrogaController.getProrrogas);
router.get("/prorrogabyctr/:unid", AdminAuth, ProrrogaController.getProrrogasByCtr);
router.delete('/prorroga/:id', AdminAuth, ProrrogaController.delete);

router.get('/unidades', AdminAuth, AuxiliarController.getUnidades);

module.exports = router;