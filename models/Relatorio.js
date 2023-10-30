/* 
$filt = $this->filtBase(); //to_char(coalesce(p.mindate,c.dt_final),'DD-MM-YYYY') as venc, --  + INTERVAL '3 months'
                $this->sql = "SELECT num_contrato as \"Nº Contrato\", regexp_replace(descricao, E'[\\n\\r]+', ' ', 'g' ) as descricao, prorr as \"Nº Prorrog\", dt_pj as \"Dt Encamin\" FROM (SELECT c.num_contrato, c.descricao, c.gestor, coalesce(p.ordem,0) as prorr, dt_pj "
                    . "FROM contrato c left join "
                    . "(SELECT id_contrato, min(ordem) as ordem, min(dt_inicio) AS mindate, min(dt_pj) as dt_pj FROM prorroga where encaminhado=0 GROUP BY id_contrato) "
                    . "p using(id_contrato) join unidade u using(id_unidade) $filt) x where dt_pj <= CURRENT_DATE ";
                $this->titulo = "CONTRATOS A VENCER";
*/

var knex = require("../database/connection");
const moment = require("moment");

class Relatorio {
  strFilter = [];

  async getVencimentos(filter) {
    try {
      var filtros = await this.createFilter(filter, true);

      var result = knex
        .select(["u.nome as unidade", "c.num_contrato"])
        .column(
          knex.raw(
            "regexp_replace(descricao, E'[\\n\\r]+', ' ', 'g' ) as descricao"
          )
        )
        .column(knex.raw("COALESCE(p.ordem, 0) as prorr"))
        .column(knex.raw("COALESCE(p.dt_final, c.dt_final) as dt_final"))
        .table("contrato as c")
        .join("unidade as u", "u.id_unidade", "=", "c.id_unidade")
        .leftJoin(
          knex.raw(
            "(SELECT id_contrato, max(ordem) as ordem, max(dt_final) as dt_final " +
              "FROM prorroga p GROUP BY id_contrato) as p"
          ),
          "p.id_contrato",
          "=",
          "c.id_contrato"
        )
        .modify(function (queryBuilder) {
          filtros.forEach((el) => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        });

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getProrrogacao(filter) {
    try {
      var filtros = await this.createFilter(filter, true);

      var result = await knex
        .select(["u.nome as unidade", "c.descricao", "c.num_contrato"])
        .column(knex.raw("array_agg(json_build_object('dets', d.*)) as detail"))
        .column(knex.raw("'101' as tp"))
        .column(knex.raw("to_char(c.dt_inicio, 'dd/mm/yyyy') as dt_inicio"))
        .column(
          knex.raw(
            "to_char(c.dt_final, 'dd/mm/yyyy') as dt_final"
          )
        )
        .table("contrato as c")
        .join("unidade as u", "u.id_unidade", "=", "c.id_unidade")
        .leftJoin(
          knex.raw(
            "(SELECT id_contrato, ordem, num_ta, to_char(dt_inicio, 'dd/mm/yyyy') as dt_inicio, to_char(dt_final, 'dd/mm/yyyy') as dt_final " +
              "FROM prorroga ORDER BY ordem) as d"
          ),
          "d.id_contrato",
          "=",
          "c.id_contrato"
        )
        .groupBy(["u.nome", "c.descricao", "c.num_contrato", "c.dt_inicio", "c.dt_final"])
        .modify(function (queryBuilder) {
          filtros.forEach((el) => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        });

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getIdentificacaoExp(filter) {
    try {
      var filtros = await this.createFilter(filter, false);

      var result = await knex
        .select([
          "m.nome as municipio",
          "i.responsavel",
          "amostra",
          "macho",
          "femea",
          "femea_ing",
          "larva",
          "ninfa",
          "pool",
        ])
        .column(knex.raw("'2' as tp"))
        .column(knex.raw("CONCAT(g.nome, ' ', e.nome) as especie"))
        .table("identificacao as i")
        .join(
          "identificacao_det as d",
          "d.id_identificacao",
          "=",
          "i.id_identificacao"
        )
        .join("contrato as c", "c.id_contrato", "=", "i.id_contrato")
        .join("especie as e", "e.id_especie", "=", "d.id_especie")
        .join("genero as g", "g.id_genero", "=", "e.id_genero")
        .column(knex.raw("to_char(c.dt_contrato, 'dd/mm/yyyy') as dt_contrato"))
        .column(
          knex.raw(
            "to_char(i.dt_identificacao, 'dd/mm/yyyy') as dt_identificacao"
          )
        )
        .join("municipio as m", "m.id_municipio", "=", "c.id_municipio")
        .modify(function (queryBuilder) {
          filtros.forEach((el) => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        });

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createFilter(filter, isStr) {
    var filtros = [];
    if (isStr) this.strFilter = [];

    if (filter.id_municipio && filter.id_municipio > 0) {
      filtros.push({
        field: "u.id_unidade",
        operator: "=",
        value: filter.id_unidade,
      });

      var unid = await knex("unidade")
        .where("id_unidade", filter.id_unidade)
        .first();

      if (isStr) this.strFilter.push("Unidade: " + unid.nome.trim());
    }

    if (filter.dt_inicio) {
      filtros.push({
        field: "c.dt_inicial",
        operator: ">=",
        value: filter.dt_inicio,
      });
      if (isStr)
        this.strFilter.push(
          "Data de Início >= " + this.formatDate(filter.dt_inicio)
        );
    }

    if (filter.dt_final) {
      filtros.push({
        field: "c.dt_final",
        operator: "<=",
        value: filter.dt_final,
      });
      if (isStr)
        this.strFilter.push(
          "Data de Término <= " + this.formatDate(filter.dt_final)
        );
    }

    return filtros;
  }

  formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }
}

module.exports = new Relatorio();
