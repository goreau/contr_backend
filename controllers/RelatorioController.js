var Relatorio = require("../models/Relatorio");


class RelatorioController{
    async getRelat(req, res){
      var id = req.params.id;
      var filter = req.body;
    

      var regs = [];

      switch (id) {
        case '1':
          regs = await Relatorio.getVencimentos(filter);
          break;
        case '101':
          regs = await Relatorio.getProrrogacao(filter);
          break;
        default:
          regs = [];
          break;
      }

      var filtro = Relatorio.strFilter;
      var filt = filtro.length > 0 ? 'Filtros: ' +  filtro.join(', ') : '';
      var ret = {data: regs, filter: filt};

      res.json(ret);
    }

    async getExport(req, res){
      var id = req.params.id;
      var filter = req.body;

      var regs = [];

      switch (id) {
        case '1':
          regs = await Relatorio.getCapturaExp(filter);
          break;
        case '2':
          regs = await Relatorio.getIdentificacaoExp(filter);
          break;
        default:
          regs = [];
          break;
      }

      
      res.json(regs);
    }
    
}

module.exports = new RelatorioController();