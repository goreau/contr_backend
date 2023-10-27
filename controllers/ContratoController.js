var Contrato = require("../models/Contrato");

class ContratoController {
  async create(req, res) {
    try {
      var dados = req.body;
      var result = await Contrato.create(dados);
      res.status(200);
      res.json({ msg: "Contrato cadastrado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getContrato(req, res) {
    var id = req.params.id;
    var locs = await Contrato.getContrato(id);
    res.json(locs);
  }

  async update(req, res) {
    try {
      var dados = req.body;
      var result = await Contrato.update(dados);
      res.status(200);
      res.json({ msg: "Contrato alterado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getContratos(req, res) {
    var filter = req.params.mun;
    var locs = await Contrato.getContratos(filter);
    res.json(locs);
  }

  async getContratosByUnid(req, res) {
    var filter = req.params.unid;
    var locs = await Contrato.getContratos(filter);
    res.json(locs);
  }

  

  async delete(req, res) {
    var id = req.params.id;
    var result = await Contrato.delete(id);
    res.status(200);
    res.json({ msg: "Contrato excluído!" });
  }
}

module.exports = new ContratoController();
