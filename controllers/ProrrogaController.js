var Prorroga = require("../models/Prorroga");

class ProrrogaController {
  async create(req, res) {
    try {
      var dados = req.body;
      var result = await Prorroga.create(dados);
      res.status(200);
      res.json({ msg: "Prorroga cadastrado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getProrroga(req, res) {
    var id = req.params.id;
    var locs = await Prorroga.getProrroga(id);
    res.json(locs);
  }

  async update(req, res) {
    try {
      var dados = req.body;
      var result = await Prorroga.update(dados);
      res.status(200);
      res.json({ msg: "Prorroga alterado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getProrrogas(req, res) {
    var filter = req.params.mun;
    var locs = await Prorroga.getProrrogas(filter);
    res.json(locs);
  }

  async getProrrogasByCtr(req, res) {
    var filter = req.params.ctr;
    var locs = await Prorroga.getProrrogas(filter);
    res.json(locs);
  }

  

  async delete(req, res) {
    var id = req.params.id;
    var result = await Prorroga.delete(id);
    res.status(200);
    res.json({ msg: "Prorroga excluído!" });
  }
}

module.exports = new ProrrogaController();
