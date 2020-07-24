const express = require('express'); //importanto funcionalidades do 'express' na variavel express
const cors = require('cors'); //Modulo que determina quem pode acessar a aplicação
const routes = require('./routes');

const app = express(); //variavel que vai armazenar a aplicação

app.use(cors()); //permite que todas as aplicações frontend possam acessar esse backend
app.use(express.json()); //fazer com que as requisições passadas sejam entendidas pelo express(converte o json em um objeto de javascript)
app.use(routes);

app.listen(3333); //porta que a aplicação que vai abrir

/** NODE
 * 
 * NPX: Executa Pacotes
 * NPM: Instala Pacotes,extensões etc...
 */

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP
 * 
 * GET: Buscar/listar informação do back-end
 * POST: Cria uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 */


 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após "?" | "?name=Lucas" "?name=Lucas&Idade=25| (Filtros, paginação)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da requisição, utilizado para cirar ou alterar recursos
  */


  /**
   * SQL(relacionais):MySQL, SQLite, PostegreSQL, Oracle , Microsoft SQL Server
   * NoSQL(não relacionais): MongoDB, CounchDB ,etc
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('useres').select('*')
    */



