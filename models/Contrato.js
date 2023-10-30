//id_contrato, id_unidade, num_contrato, num_processo, dt_inicio, dt_final, gestor, 
//id_usuario, duracao, descricao, observacao, empresa, valor, deleted, created_at, updated_at

var knex = require("../database/connection");

class Contrato {
  async create(dados) {
    try {
      var { id_unidade, num_contrato, num_processo, dt_inicio, dt_final, gestor,id_usuario, duracao, descricao, observacao, empresa, valor } = dados;

      const result = await knex
        .insert({
            id_unidade, num_contrato, num_processo, dt_inicio, dt_final, gestor,id_usuario, duracao, descricao, observacao, empresa, valor
        })
        .table("contrato");

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async update(dados) {
    try {
      var {
        id_contrato, id_unidade, num_contrato, num_processo, dt_inicio, dt_final, gestor,id_usuario, duracao, descricao, observacao, empresa, valor
      } = dados;

      await knex("contrato")
        .where("id_contrato", id_contrato)
        .update({
            id_unidade, num_contrato, num_processo, dt_inicio, dt_final, gestor,id_usuario, duracao, descricao, observacao, empresa, valor
        });
    } catch (err) {
      console.log(err);
    }
  }

  
  async getContratos(filter) {
    try {
      var result = [];

      result = await knex
        .select("c.*",  'u.nome as unidade')
        .table("contrato as c")
        .join("unidade as u", "u.id_unidade", "=", "c.id_unidade")
        .orderBy("id_contrato", "desc");

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  
  async getContrato(id) {
    try {
      var result = [];

      result = await knex
        .select("c.*", 'u.nome as unidade')
        .column(
          knex.raw(
            " u.nome as unidade"
          )
        )
        .table("contrato as c")
        .where("id_contrato", "=", id)
        .join("unidade as u", "u.id_unidade", "=", "c.id_unidade");

      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  

  async delete(id) {
    try {
      await knex.delete().where({ id_contrato: id }).table("contrato");
      return { status: true };
    } catch (err) {
      return { status: false, err: err };
    }
  }

  

  async getCombo(mun) {
    try {
      var result = [];

      result = await knex
        .select(["c.id_contrato"])
        .column(knex.raw(
            "CONCAT(c.num_contrato, '/', c.descricao) as nome"
        ))
        .table("contrato as c")
        .where("c.deleted", "=", 0);
        
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

}

module.exports = new Contrato();
