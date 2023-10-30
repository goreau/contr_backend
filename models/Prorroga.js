//id_prorroga, id_contrato, ordem, dt_inicio, dt_final, dt_pj, 
//id_usuario, encaminhado, num_ta, observacao, valor, deleted, created_at, updated_at

var knex = require("../database/connection");

class Prorroga {
  async create(dados) {
    try {
      var { id_contrato, ordem, dt_inicio, dt_final, dt_pj, id_usuario, encaminhado, num_ta, observacao, valor } = dados;

      dt_pj = dt_pj == '' ? 'infinity' : dt_pj;
      const result = await knex
        .insert({
            id_contrato, ordem, dt_inicio, dt_final, dt_pj, id_usuario, encaminhado, num_ta, observacao, valor
        })
        .table("prorroga");

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async update(dados) {
    try {
      var {
        id_prorroga, id_contrato, ordem, dt_inicio, dt_final, dt_pj, id_usuario, encaminhado, num_ta, observacao, valor
      } = dados;

      dt_pj = dt_pj == '' ? 'infinity' : dt_pj;
      await knex("prorroga")
        .where("id_prorroga", id_prorroga)
        .update({
            id_contrato, ordem, dt_inicio, dt_final, dt_pj, id_usuario, encaminhado, num_ta, observacao, valor
        });
    } catch (err) {
      console.log(err);
    }
  }

  
  async getProrrogas(filter) {
    try {
      var result = [];

      result = await knex
        .select(["p.*", "u.nome as unidade"])
        .column(knex.raw(
          "CONCAT(c.num_contrato, '/', c.descricao) as contrato"
      ))
        .table("prorroga as p")
        .join("contrato as c", "c.id_contrato", "=", "p.id_contrato")
        .join("unidade as u", "u.id_unidade", "=", "c.id_unidade")
        .where("c.deleted", "=", 0)
        .orderBy("id_prorroga", "desc");

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  
  async getProrroga(id) {
    try {
      var result = [];

      result = await knex
        .select("c.*")
        .table("prorroga as c")
        .where("id_prorroga", "=", id);

      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  

  async delete(id) {
    try {
      await knex.delete().where({ id_prorroga: id }).table("prorroga");
      return { status: true };
    } catch (err) {
      return { status: false, err: err };
    }
  }

  

  async getCombo(mun) {
    try {
      var result = [];

      result = await knex
        .select(["c.id_prorroga", 'c.codigo'])
        .table("prorroga as c")
        .leftJoin("identificacao as i", "i.id_prorroga", "=", "c.id_prorroga")
        .where("c.id_municipio", "=", mun)
        .whereNull('i.id_identificacao')
        
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

}

module.exports = new Prorroga();
