var knex = require("../database/connection");


class Auxiliar{

    async getUnidades(){
        try{
            var result = await knex.select(["id_unidade","nome"])
            .table("unidade as u")
            .where({deleted: 0});
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

}

module.exports = new Auxiliar();