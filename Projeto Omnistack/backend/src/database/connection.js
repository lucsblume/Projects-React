const knex = require('knex');
const configuration = require('../../knexfile') //importanto configurações do banco de dados

const connection = knex(configuration.development) //criando conexão com o banco de dados

module.exports = connection; //exportando a conexão com o banco de dados