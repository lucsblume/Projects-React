import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json()); //introduzindo o pacote jso no expres

app.use(cors());

app.use(routes);

//localhost:3333
app.listen(3333); //ouvindo endereço http






//GET: Buscar ou listar uma informação
//POST: Criar alguma nova informação
//PUT: Atualizar uma informação existente
//DELETE: deletar uma informalçao existente

//Corpo (Request Body): Dados para criação ou atualização de um registro;
//Route Params: Identificar qual recurso eu quero atualizar ou deletar
//Query Params: Paginação, Filtro, Ordenação

                  //requisição, resposta