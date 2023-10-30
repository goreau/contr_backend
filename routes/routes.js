var express = require("express")
var app = express();
var router = express.Router();

var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ContratoController = require("../controllers/ContratoController");
var ProrrogaController = require("../controllers/ProrrogaController");
var RelatorioController = require("../controllers/RelatorioController");

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
router.get("/contratoscombo/:filter", AdminAuth, ContratoController.getCombo);
router.delete('/contrato/:id', AdminAuth, ContratoController.delete);

router.post('/prorroga', AdminAuth, ProrrogaController.create);
router.get("/prorroga/:id", AdminAuth, ProrrogaController.getProrroga);
router.put('/prorroga', AdminAuth, ProrrogaController.update);
router.get("/prorrogas/:filter", AdminAuth, ProrrogaController.getProrrogas);
router.get("/prorrogabyctr/:unid", AdminAuth, ProrrogaController.getProrrogasByCtr);
router.delete('/prorroga/:id', AdminAuth, ProrrogaController.delete);

router.post("/relat/:id", AdminAuth, RelatorioController.getRelat);
router.post("/export/:id", AdminAuth, RelatorioController.getExport);

router.post('/unidade', AdminAuth, AuxiliarController.createUnidade);
router.get("/unidade/:id", AdminAuth, AuxiliarController.getUnidade);
router.put('/unidade', AdminAuth, AuxiliarController.updateUnidade);
router.get("/unidades/:filter", AdminAuth, AuxiliarController.getUnidades);
router.delete('/unidade/:id', AdminAuth, AuxiliarController.deleteUnidade);
router.get('/unidadescombo', AdminAuth, AuxiliarController.getUnidadesCombo);

router.post('/natureza', AdminAuth, AuxiliarController.createNatureza);
router.get("/natureza/:id", AdminAuth, AuxiliarController.getNatureza);
router.put('/natureza', AdminAuth, AuxiliarController.updateNatureza);
router.get("/naturezas/:filter", AdminAuth, AuxiliarController.getNaturezas);
router.delete('/natureza/:id', AdminAuth, AuxiliarController.deleteNatureza);
router.get('/naturezascombo', AdminAuth, AuxiliarController.getNaturezasCombo);

module.exports = router;