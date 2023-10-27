require('dotenv').config();
var Auxiliar = require("../models/Auxiliar");
class AuxiliarController{

    async getUnidades(req, res){
        //  var id = req.params.id;
          var users = await Auxiliar.getUnidades();
          if(users == undefined){
              res.status(404);
              res.json({});
          }else{
              res.status(200)
              res.json(users);
          }
      }
  
}

module.exports = new AuxiliarController();